import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../services/settings.service';

// disponible en 'src/assets/js/custom.js'
declare function customInitFunctions(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: ``
})
export class PagesComponent implements OnInit {
  
  constructor( private settingService: SettingsService ) { }

  ngOnInit(): void {
    customInitFunctions()
  }
}
