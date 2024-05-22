import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Medico } from '../../../models/medico.model';
import { Hospital } from '../../../models/hospital.model';

import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: ``
})

export class MedicoComponent implements OnInit{
  
  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];

  public medicoSeleccionado!: Medico;
  public hospitalSeleccionado!: Hospital;

  public cargando: boolean = true;


  constructor( private fb: FormBuilder,
               private hospitalService: HospitalService,
               private medicoService: MedicoService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) {};
  
  
  ngOnInit(): void {

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required ],
      hospital: ['', Validators.required ]
    });
    
    this.cargarHospitales();

    this.activatedRoute.params
      .subscribe( ({ id }) => this.cargarMedico(id) );

    this.medicoForm.get('hospital')!.valueChanges
      .subscribe(  hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find( hospital => hospital._id === hospitalId )!
      })
  }

  cargarMedico( id:string ){
    
    if( id === 'nuevo' ){
      this.cargando = false;
      return;
    }
    this.cargando = true;

    this.medicoService.obtenerMedicoPorId( id )
      .pipe( delay(50) )
      .subscribe( {
        next: (medico: Medico) => {        
                if( !medico ){
                  return;
                } else {
                  this.cargando = false;
                  const { nombre } = medico ;
                  const { _id } = medico.hospital! ;
                  this.medicoSeleccionado = medico;
                  this.medicoForm.setValue({ nombre, hospital:_id})
                  return;
                }
              },
        error: () => { return this.router.navigateByUrl(`/dashboard/medicos`); }
      })
  }

  cargarHospitales() {

    this.hospitalService.cargarHospitales()
      .subscribe( (hospitales: Hospital[])=>{
        this.hospitales = hospitales;
      })
  }


  guardarMedico(){
  
    const { nombre } = this.medicoForm.value;

    if( this.medicoSeleccionado ){
      // actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id,
        img: this.medicoSeleccionado.img
      }
      this.medicoService.actualizarMedico( data )
        .subscribe( resp =>{
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success')
        })
    } else {
      // crear
      this.medicoService.crearMedico( this.medicoForm.value )
        .subscribe( (resp: any) => {
          Swal.fire('Creado', `${ nombre } creado correctamente`, 'success')
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id }`)
        })
    }
  }

}
