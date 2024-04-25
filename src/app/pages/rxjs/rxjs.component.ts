import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: ``
})

export class RxjsComponent implements OnDestroy {


  public intervalSubs: Subscription;

  constructor() { 
    
    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   {
    //     next: (valor) => console.log( 'Valor emitido:',valor ),
    //     error: err => console.warn( 'Error disparado:', err ),
    //     complete: ()=>console.info('Observable terminado', true)
    //   }
    // );
    
    this.intervalSubs = this.retornaIntervalo()
          .subscribe( console.log )
  }
  
  ngOnDestroy(): void {
    
    this.intervalSubs.unsubscribe();

  }
;

  // Utilizando operadores en observable
  retornaIntervalo(): Observable<number> {
    
    return interval(100)
            .pipe( 
              take(10),
              map( (valor)=> valor + 1 ),
              filter( valor => ( valor % 2 === 0 ) ? true : false ),
            );
  }

  // Observable manual
  retornaObservable(): Observable<number> {
    let i = -1;
    
    return new Observable<number>( observer => {
      const intervalo = setInterval( () => {

        i++
        observer.next(i)

        if ( i === 4 ){
          clearInterval( intervalo );
          observer.complete();
        }
        
        if ( i === 2 ){
          console.error('i = 2.... error', i)
          clearInterval( intervalo );
          observer.error('i llego al Valor de 2');
        }
      }, 1000 );
      
    });

  }

}
