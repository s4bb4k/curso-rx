import { of } from "rxjs";
import { ajax, AjaxError } from "rxjs/ajax";
import { catchError } from "rxjs/operators";

const url = 'https://httpbin.org/delay/1';

const manejaError = ( resp: AjaxError) => {
    console.warn('error:', resp.message);
    return of({
        ok: false,
        usuario: []
    });
}


// ajax.post(url, {
//     id: 1,
//     nombre: 'nombre'
// }, {
//     'mi-token': 'ABC123'
// }).subscribe( console.log );

ajax({
    url: url,
    method: 'POST',
    headers: {
        'mi-token': 'ABC123'
    },
    body: {
        id: 1,
        nombre: 'nombre'
    }
}).subscribe(console.log);