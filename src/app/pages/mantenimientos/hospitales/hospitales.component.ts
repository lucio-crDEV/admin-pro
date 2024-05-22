import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Hospital } from '../../../models/hospital.model';

import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: ``
})

export class HospitalesComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  private imgSubs!:Subscription;  

  constructor( private hospitalService: HospitalService,
               private modalImagenService: ModalImagenService,
               private busquedaService: BusquedasService
   ){  }
   
  ngOnInit(): void {
    this.cargarHospitales();
     
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe( delay(100) )
      .subscribe( img => 
        this.cargarHospitales() 
    );
  };
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  cargarHospitales() {
    this.cargando = true;
    
    this.hospitalService.cargarHospitales()
      .subscribe( hospitales => {
        this.cargando = false;
        this.hospitales = hospitales
        this.hospitalesTemp = hospitales
      });
  };

  actualizarHospital(hospital: Hospital){
    
    this.hospitalService.actualizarHospital( hospital._id!, hospital.nombre )
      .subscribe( resp =>{
        Swal.fire('Actualizando', hospital.nombre, 'success');
      });
  }

  eliminarHospital(hospital: Hospital){
    
    Swal.fire({
      title: "¿Borrar Hospital?",
      html: `Esta a punto de borrar el Hospital:<br><br>
      <b>${ hospital.nombre }</b>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Si, borrarlo!",
      cancelButtonText: "Cancelar",
      focusCancel: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.borrarHospital( hospital._id! )
          .subscribe( ( resp ) => {
            this.cargarHospitales();
            Swal.fire("Borrado!", `<b>${ hospital.nombre }</b> fue eliminado correctamente.`,"success");
          })
      }
    });
  }


  async abrirSweetAlert(){
    const { value } = await Swal.fire<string>({
      icon:'info',
      title: 'Crear Hospital',
      text: "Ingrese el nombre del nuevo hospital",
      input: "text",
      inputPlaceholder: "Nombre del Hospital",
      inputAttributes:{
        autocomplete: 'off'
      },
      inputAutoFocus: true,
      confirmButtonText: 'Crear',
      showCancelButton: true,
      cancelButtonText:'Cancelar',
      cancelButtonColor: "#dc3545",
    });

    if( value ){
      if(value.trim().length > 0){
        this.hospitalService.crearHospital( value )
          .subscribe( resp => {
            this.cargarHospitales()         
          })
      }
    }
  }

  abrirModal( hospital: Hospital ){
    this.modalImagenService.abrirModal('hospitales', hospital._id!, hospital.img );
  }

  buscar( termino:string  ): Hospital[] {

    if( termino.length === 0){
      return this.hospitales = this.hospitalesTemp;
    }
    
    this.busquedaService.buscar( 'hospitales', termino )
      .subscribe( (resultados) => {
        this.hospitales = resultados as Hospital[];
      })

    return this.hospitales;
  }

}
