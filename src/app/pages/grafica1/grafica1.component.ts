import { Component } from '@angular/core';

interface Data {
  data: number[],
  label: string,
  backgroundColor: string[]
}

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: ``
})

export class Grafica1Component {

  labels1: string[] = ['Pan', 'Refrescos', 'Arvejas', 'Zapallo'];
  labels2: string[] = ['K/D', 'ACS', '%hs', 'WinRate']
  labels3: string[] = ['Duracion', 'Frecuencia', 'Participantes']

  data1: Data[] = [
    {
      data: [20, 6, 40, 80],
      label: 'valor ',
      backgroundColor: ['#6857E6', '#009FEE', '#00AA99', '#F02059']
    }
  ];

  data2: Data[] = [
    {
      data: [1.48, 264.6, 24.4, 51.1],
      label: 'valor ',
      backgroundColor: ['#6857E6', '#009FEE', '#00AA99', '#F02059']
    }
  ];
  data3: Data[] = [
    {
      data: [20, 6, 3],
      label: 'valor ',
      backgroundColor: ['#6857E6', '#009FEE', '#00AA99']
    }
  ];

}
