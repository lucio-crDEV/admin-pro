import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Medico } from '../../../models/medico.model';
import { Hospital } from '../../../models/hospital.model';

import { MedicoService } from '../../../services/medico.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: ``
})

export class MedicosComponent implements OnInit, OnDestroy{

  public cargando: boolean = true;
  public medicos: Medico[] =  [];
  public medicosTemp: Medico[] = [];
  private imgSubs!: Subscription;
  private hospitales: Hospital[] = []

  constructor( private medicoService: MedicoService,
               private busquedaService: BusquedasService,
               private modalImageService: ModalImagenService
   ){  }
   
  ngOnInit(): void {

    this.cargarMedicos();

    this.imgSubs = this.modalImageService.nuevaImagen
      .pipe( delay(100) )
      .subscribe( () => 
        this.cargarMedicos() 
      )
  };
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarMedicos(){
    this.cargando = true;

    this.medicoService.cargarMedicos()
      .subscribe( medicos =>{
        this.cargando = false;
        this.medicos = medicos;
        this.medicosTemp = medicos;
    })
  }
  
  eliminarMedico( medico: Medico ){
    
    Swal.fire({
      title: "¿Borrar Médico?",
      html: `Esta a punto de borrar al Médico:<br><br>
      <b>${ medico.nombre }</b>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Si, borrar!",
      cancelButtonText: "Cancelar",
      focusCancel: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico( medico._id! )
          .subscribe( ( resp ) => {
            this.cargarMedicos();
            Swal.fire("Borrado!", `<b>${ medico.nombre }</b> fue eliminado correctamente.`,"success");
          })
      }
    });
  }

  abrirModal( medico: Medico ){
    this.modalImageService.abrirModal('medicos', medico._id!, medico.img)
  }

  buscar( termino: string ){
    
    if( termino.length === 0 ){
      return this.cargarMedicos();
    }

    this.busquedaService.buscar('medicos', termino)
      .subscribe( resultado => {
        this.medicos = resultado as Medico[];
      })
    
      return this.hospitales;
  }
}
