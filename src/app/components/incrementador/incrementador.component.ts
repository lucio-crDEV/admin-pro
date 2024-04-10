import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: ``
})
export class IncrementadorComponent {

  // esperando un input con nombre especial que corresponde a la variable definida
  @Input('valor') progreso: number = 50;
  // default, espera un input de nombre progreso
  // @Input() progreso: number = 50;

  // @Output() valorSalida: EventEmitter<number> = new EventEmitter();
  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

  cambiarValor(valor: number) {

    if (this.progreso >= 100 && valor > 0) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }
    
    if (this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }
    
    this.progreso = this.progreso + valor;
    this.valorSalida.emit( this.progreso );
    return this.progreso;
  }
}
