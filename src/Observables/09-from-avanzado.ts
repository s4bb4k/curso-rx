import { of, from } from 'rxjs';

/**
 * of = toma argunmentos y genera un secuencia
 * from = array, promise, iterable, observable 
 **/

const observer = {
    next: val => console.log('next:', val),
    complete: () => console.log('Complete')
}

const miGenerador = function*(){
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
}

const miIterable = miGenerador();

for(let id of miIterable) {
    console.log(id);
}

from( miIterable ).subscribe( observer );

// const src$ = from([1,2,3,4,5]);
// const src$ = of(...[1,2,3,4,5]);
// const src$ = from('HolaMundo');
const src$ = from( fetch('https://api.github.com/users/klerith'));

/*src$.subscribe( async(res) => {
    console.log(res.url);
    const dataResp = await res.json();
    console.log(dataResp);
});*/

// src$.subscribe( observer );