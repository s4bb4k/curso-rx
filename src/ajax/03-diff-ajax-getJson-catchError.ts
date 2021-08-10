import { of } from "rxjs";
import { ajax, AjaxError } from "rxjs/ajax";
import { catchError } from "rxjs/operators";

const url = 'https://httpbinxx.org/delay/1';
const manejaError = ( resp: AjaxError) => {
    console.warn('error:', resp.message);
    return of({
        ok: false,
        usuario: []
    });
}


const obs$ = ajax.getJSON( url ).pipe(
    catchError( manejaError )
);
const obs2$ = ajax( url ).pipe(
    catchError( manejaError )
);

obs$.subscribe({
    next: val => console.log('next:', val),
    error: err => console.log('error:', err),
    complete: () => console.log('complete')
});
//obs2$.subscribe( data => console.log('ajax:', data))
