import { Item } from './../interfaces/Item.interfaces';

import { debounceTime, map, mergeAll, pluck, mergeMap, switchMap } from 'rxjs/operators';
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
    mergeMap<string, Observable<any>>( texto => ajax.getJSON(
            `https://api.github.com/search/users?q=${ texto }`            
    )),
    pluck<any, Item[]>('items')
);//.subscribe( mostrarUsers );

const url = 'https://httpbin.org/delay/1?arg=';
input$.pipe(
    pluck('target', 'value'),
    switchMap( text => ajax.getJSON( url + text) )
).subscribe( console.log );