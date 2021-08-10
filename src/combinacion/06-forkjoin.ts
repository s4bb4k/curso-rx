import { delay, take } from 'rxjs/operators';
import { of, interval, forkJoin } from 'rxjs';


const numeros$ = of(1,2,3,4);
const interval$ = interval(1000).pipe( take(3) ) //0..1..2
const letras$ = of('a','b','c').pipe( delay(3500));

/*forkJoin(
    numeros$,
    interval$,
    letras$
).subscribe( console.log );*/

/*forkJoin(
    numeros$,
    interval$,
    letras$
).subscribe( res => {
        console.log('numeros: ', res[0])
        console.log('intervalo: ', res[1])
        console.log('letras: ', res[2])
});*/

/*forkJoin(
    numeros$,
    interval$,
    letras$
).subscribe( res => {
        console.log(res)
});*/

forkJoin({
    num: numeros$,
    int: interval$,
    let: letras$
}).subscribe( res => {
        console.log(res)
});


