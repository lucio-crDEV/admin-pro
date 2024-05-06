import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  menuItems: any[] = [];

  constructor( 
    private sidebarService: SidebarService,
    private usuarioService: UsuarioService
   ) { 
    this.menuItems = sidebarService.menu;
  }

  ngOnInit(): void {
    
  };
  
  logout(){
    this.usuarioService.logout()
    // this.usuarioService.goDashboard()
  }
}
