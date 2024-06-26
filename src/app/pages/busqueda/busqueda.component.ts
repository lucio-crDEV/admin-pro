import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BusquedasService } from '../../services/busquedas.service';

import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: ``
})

export class BusquedaComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public medicos: Medico[] = [];
  public usuarios: Usuario[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private busquedasService: BusquedasService,
   ){  }
  
  ngOnInit(): void {
  
    this.activatedRoute.params
      .subscribe( ({termino}) => {
        
        this.busquedaGlobal( termino );
      })

  };


  busquedaGlobal( termino: string ){
    this.busquedasService.busquedaGlobal( termino )
      .subscribe( (resp:any) =>{
        this.usuarios   = resp.usuarios;
        this.medicos    = resp.medicos;
        this.hospitales = resp.hospitales;
      })
  }
  
}
