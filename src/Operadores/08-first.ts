import { of, fromEvent } from 'rxjs';
import { reduce, scan, map, take, tap, first } from 'rxjs/operators';

const click$ = fromEvent<MouseEvent>( document, 'click' );

click$.pipe(
    tap<MouseEvent>(() => console.log ),
    /*map( event => ({ 
        clientY: event.clientY,
        clientX: event.clientX
     }))*/
     map(({ clientX, clientY }) => ({
         clientX, clientY
     })),
    first( event => event.clientY >= 150 )
)
.subscribe({
    next: val => console.log('next:', val),
    complete: () => console.log('complete')
});


