import { from } from 'rxjs';
import { reduce, scan, map } from 'rxjs/operators';

const numbers = [1,2,3,4,5];

const totalAcumulador = ( acc, cur ) => acc + cur;

// reduce
from(numbers).pipe(
    reduce( totalAcumulador )
)
.subscribe( console.log )

// scan
from(numbers).pipe(
    scan( totalAcumulador )
)
.subscribe( console.log )

// Redux
interface Usuario {
    id?: string;
    autenticado?: boolean;
    token?: string;
    edad?: number;
}

const user: Usuario[] = [
    { id: 'asd', autenticado: false, token: null },
    { id: 'asd', autenticado: true, token: 'ABC' },
    { id: 'asd', autenticado: true, token: 'ABC123' },
];

const state$ = from( user ).pipe(
    scan<Usuario>( (acc, cur) => {
        return { ...acc, ...cur }
    }, { edad:12 })
);

const id$ = state$.pipe(
    map( state => state.id )
);

id$.subscribe( console.log );

