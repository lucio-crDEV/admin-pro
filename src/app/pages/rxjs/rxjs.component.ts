import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: ``
})

export class RxjsComponent {

  constructor() { 
    
    this.retornaObservable().pipe(
      retry(2)
    ).subscribe(
      {
        next: (valor) => console.log( 'Valor emitido:',valor ),
        error: err => console.warn( 'Error disparado:', err ),
        complete: ()=>console.info('Observable terminado', true)
      }
    );
    
  };

  retornaObservable(): Observable<number>  {
    let i = -1;
    
    return new Observable<number>( observer => {
      const intervalo = setInterval( () => {

        console.log('Valor que se va a aumentar:', i)

        i++
        console.log('Valor a aumentado:', i)
        observer.next(i)

        if ( i === 4 ){
          console.log('Condicion para emitir complete():', i===4)
          clearInterval( intervalo );
          observer.complete();
        }
        
        if ( i === 2 ){
          // i = 0
          console.error('i = 2.... error', i)
          clearInterval( intervalo );
          // el retry se salta el observer error
          observer.error('i llego al Valor de 2');
        }
      }, 1000 );
      
    });

  }

}
