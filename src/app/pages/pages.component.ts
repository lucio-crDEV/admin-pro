import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: ``
})
export class PagesComponent implements OnInit {
  
  // solución personal
  // public themeSaved = localStorage.getItem('theme')
  // public defaultTheme = './assets/css/colors/blue-dark.css'

  // solucion clase 
  public linkTheme = document.querySelector('#theme');

  constructor( private settingService: SettingsService ) { }

  ngOnInit(): void {

    // solucion personal 
    // document.querySelector('#theme')?.setAttribute('href', this.defaultTheme)
    // if ( this.themeSaved ) { document.querySelector('#theme')?.setAttribute('href', this.themeSaved) }
    // localStorage.setItem('theme', this.defaultTheme)

    // solucion clase 
    const url = localStorage.getItem('theme') || './assets/css/colors/blue-dark.css';
    this.linkTheme!.setAttribute('href', url);
    localStorage.setItem('theme', url)
    
  }
}
