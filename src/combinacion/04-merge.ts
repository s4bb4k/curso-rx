import { pluck } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';

const keyup$ = fromEvent(document, 'keyup');
const click$ = fromEvent(document, 'click');

merge( keyup$.pipe( pluck('type') ),
       click$.pipe( pluck('type') ))
.subscribe( console.log );