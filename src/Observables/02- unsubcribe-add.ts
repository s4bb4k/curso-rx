import { Observable, Observer } from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log('siguiente [next]: ', value ),
    error: error => console.warn('error [obs]: ', error ),
    complete: () => console.info('completado [obs]')
};

const intervalo$ = new Observable<number>( subscriber => {

    let count = 0;
    const interval = setInterval( () => {
        count++;
        subscriber.next( count );
    }, 1000);

    setTimeout(() => {
        subscriber.complete();
    }, 2500);

    return () => {
        clearInterval(interval);
        console.log('Intervalo destruido');
    };

});


const subs1 = intervalo$.subscribe( observer );
const subs2 = intervalo$.subscribe( observer );
const subs3 = intervalo$.subscribe( observer );

subs1.add( subs2 )
     .add( subs3 );

setTimeout( () => {
    subs1.unsubscribe();
    console.log('completado timeout');
    
}, 3000);
