import { GithubUser } from './../interfaces/github-user.interface';
import { Item } from './../interfaces/Item.interfaces';

import { debounceTime, map, mergeAll, pluck } from 'rxjs/operators';
import { Observable, fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';

// referencias
const body = document.querySelector('body');
const textinput = document.createElement('input');
const orderlist = document.createElement('ol');
body.append( textinput, orderlist);

// helpers
const mostrarUsers = (usuarios: Item[]) => {
    console.log(usuarios);
    orderlist.innerHTML = '';

    for( const usuario of usuarios) {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = usuario.avatar_url;

        const anchor = document.createElement('a');
        anchor.href   = usuario.html_url;
        anchor.text   = 'ver pagina';
        anchor.target = '_blank';

        li.append( img );
        li.append( usuario.login + ' ' );
        li.append( anchor );

        orderlist.append(li);

    }
}

// streams
const input$ = fromEvent<KeyboardEvent>( textinput, 'keyup' );

input$.pipe(
    debounceTime<KeyboardEvent>(500),
    pluck<KeyboardEvent, string>('target', 'value'),
    map<string, Observable<any>>( texto => ajax.getJSON(
            `https://api.github.com/search/users?q=${ texto }`            
        )),
        mergeAll<GithubUser>(),
        pluck<any, Item[]>('items')
).subscribe( mostrarUsers );
