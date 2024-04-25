import { Component } from '@angular/core';

import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-notpagefound',
  templateUrl: './notpagefound.component.html',
  styleUrls: [ './notpagefound.component.css' ]
})
export class NotpagefoundComponent {

  year: number = this.settingService.getCurrentYear();

  constructor( private settingService : SettingsService ) { };

}