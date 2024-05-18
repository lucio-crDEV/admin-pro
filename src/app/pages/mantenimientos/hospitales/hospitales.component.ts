import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Hospital } from '../../../models/hospital.model';

import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: ``
})
export class HospitalesComponent implements OnInit {

  public cargando: boolean = true;
  public hospitales: Hospital[] = [];

  constructor( private hospitalService: HospitalService ){  }
  
  
  
  ngOnInit(): void {
    this.cargarHospitales();
  };
  

  cargarHospitales() {
    this.cargando = true;
    
    this.hospitalService.cargarHospitales()
      .subscribe( hospitales => {
        this.cargando = false;
        this.hospitales = hospitales
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
      inputPlaceholder: "Nombre Hospital",
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
            console.log(resp)          
          })
      }
    }
    
  }

}
