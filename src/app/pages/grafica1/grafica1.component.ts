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

  data1: Data[] = [
    {
      data: [20, 6, 40, 80],
      label: 'valor ',
      backgroundColor: ['#6857E6', '#009FEE', '#F02059', '#FF00E2']
    }
  ];

}
