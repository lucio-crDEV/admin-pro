import { Component, Input } from '@angular/core';
import { ChartConfiguration, DoughnutDataPoint } from "chart.js";

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: ``
})
export class DonaComponent {

  @Input() titulo: string = 'Sin título'

  // Doughnut
  @Input('labels') doughnutChartLabels: string[] = ['Label 1', 'Label 2', 'Label 3'];
  @Input('dataSet') doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    {
      data: [350, 450, 100],
      label: 'Valor ',
      backgroundColor: ['#6857E6', '#009FEE', '#F02059']
    }
  ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };
  
}
