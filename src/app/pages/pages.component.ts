import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

// disponible en 'src/assets/js/custom.js'
declare function customInitFunctions(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: ``
})
export class PagesComponent implements OnInit {

  year: number = this.settingService.getCurrentYear();

  constructor(private settingService: SettingsService,
              private sidebarService: SidebarService,
  ) { }


  ngOnInit(): void {
    customInitFunctions()
    this.sidebarService.cargarMenu()
  }
}
