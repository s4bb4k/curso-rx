import { map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';



const texto = document.createElement('div');
texto.innerHTML = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque molestie nisl vitae massa lobortis lacinia. Vestibulum sed massa a erat cursus condimentum et vel purus. Donec lorem tellus, pellentesque eu dolor pellentesque, luctus elementum turpis. Proin sit amet nisl mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec eleifend scelerisque sollicitudin. Nunc maximus tellus ut iaculis imperdiet. Quisque non justo nunc. Etiam commodo condimentum nulla, et lacinia nibh commodo ac.
<br/><br/>
Fusce tempus mauris ut arcu ornare vehicula. Integer semper erat eu purus eleifend, at sollicitudin est imperdiet. Nullam fringilla, risus vitae suscipit viverra, mi justo ullamcorper ligula, vitae sollicitudin sapien ante sed arcu. Phasellus ac consectetur urna. Nunc in diam semper, vehicula sapien nec, ornare leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi sed dolor sit amet sapien blandit sollicitudin. Sed eget urna ipsum. Phasellus pellentesque congue est eu blandit.
<br/><br/>
Cras facilisis leo lorem, vel rhoncus turpis gravida sit amet. Aliquam finibus, diam vel efficitur consequat, sapien metus blandit odio, euismod volutpat dui sapien in est. Suspendisse suscipit ante a elit vehicula, vitae condimentum nisi commodo. Proin tincidunt elementum dapibus. Sed sit amet purus nec turpis vestibulum ultrices et dapibus massa. Proin id leo fermentum, faucibus justo at, euismod neque. Sed est mi, gravida ut nunc id, commodo convallis libero. Sed fermentum, magna ut bibendum laoreet, sem purus elementum magna, in eleifend massa ex dignissim dolor. Duis sit amet dui id nisi porta dignissim iaculis ut sapien. Integer sagittis imperdiet orci, eu pretium ex pharetra a. Nunc tincidunt arcu non velit pellentesque sollicitudin. Phasellus porta ullamcorper viverra. Etiam placerat dignissim turpis eget blandit. Sed vitae lacus tortor.
<br/><br/>
Mauris scelerisque nulla nec fringilla laoreet. Nunc vitae lectus sed nisi commodo aliquam. Sed ac sem a tellus dignissim ultricies. Sed in efficitur sapien, at faucibus velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed semper gravida magna, ultrices venenatis justo vehicula in. Vivamus risus leo, lobortis id mi in, tincidunt auctor metus. Nulla ac enim eget nulla aliquet ullamcorper ac sollicitudin ipsum. Quisque in mollis lacus. Vestibulum in ligula ac nisl porttitor lacinia sed vel quam. Nulla tincidunt vitae nulla pretium ornare. Proin non lacus ut massa pretium varius.
<br/><br/>
Quisque a nisi hendrerit, egestas nisl eget, auctor sapien. Etiam nec mi odio. Integer vel lacus vitae nisl congue venenatis. Vestibulum ultricies nunc vitae odio dignissim, suscipit ultrices libero maximus. Aenean id arcu in arcu pellentesque sagittis nec id dui. Cras ac dui quam. Vivamus feugiat pulvinar pretium.`;

const body = document.querySelector('body');
body.append( texto );

const progressBar = document.createElement('div');
progressBar.setAttribute('class', 'progress-bar');
body.append(progressBar);

// funcion que haga el calculo
const calcularPorcentajeScroll = ( event ) => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = event.target.documentElement;

   return ( scrollTop / ( scrollHeight - clientHeight )) * 100;
}

// Streams
const scroll$ = fromEvent( document, 'scroll' );

const progressBar$ = scroll$.pipe(
    map( event => calcularPorcentajeScroll(event) )
);

const progress$ = scroll$.pipe();
progressBar$.subscribe( porcentaje => {
    progressBar.style.width = `${ porcentaje }%`;
})

