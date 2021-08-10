import { interval, fromEvent } from 'rxjs';
import { tap, skip, takeUntil } from 'rxjs/operators';

const button = document.createElement('button');
button.innerHTML = 'Detener Timer';
document.querySelector('body').append( button );

const counter$ = interval(1000);
//const clickBtn$ = fromEvent( button, 'click' );
const clickBtn$ = fromEvent( button, 'click' ).pipe(
    tap( () => console.log('tap antes del skip')),
    skip(1),
    tap( () => console.log('tap despues del skip') )
);

counter$.pipe(
    takeUntil( clickBtn$ )
)
.subscribe({
    next: val => console.log('next:', val),
    complete: () => console.log('complete')
});


