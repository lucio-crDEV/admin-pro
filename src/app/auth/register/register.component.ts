import { Component, NgZone } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { validarPassword } from './password-auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm : FormGroup = this.fb.group({
    nombre:    ['', [ Validators.required, Validators.minLength(3) ] ],
    email:     ['', [Validators.required, Validators.email ] ],
    password:  ['', Validators.required ],
    password2: ['', Validators.required ],
    terminos:  [ false, Validators.requiredTrue ],
    }, {
      validators: [ validarPassword ],
    }
  );

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private router: Router,
               private ngZone: NgZone,
   ){};
  
  crearUsuario(){

    this.formSubmitted = true;

    // si es valido crear usuario
    if( !this.registerForm.valid ){
      return;
    };


    this.usuarioService.crearUsuario( this.registerForm.value )
      .subscribe({
        next: resp => {
          this.goDashboard()
        },
        error: err => {
          console.warn(err);

          Swal.fire({
            title: 'Error',
            text: err.error.msg,
            icon: 'error',
            confirmButtonColor: '#d33',
          });
        },
      })
      
  }

  campoNoValido( campo: string ): boolean {
    
    if( this.registerForm.get(campo)!.invalid && this.formSubmitted ){ 
      return true;
     } else {
      return false;
     }
  };

  contrasenasNoValidas(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if( (pass1 !== pass2) && this.formSubmitted){
      return true;
    } else{
      return false; 
    };

  };

  passwordIguales(pass1Name: string, pass2Name: string){

    return ( formGroup: AbstractControl ) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if( pass1Control!.value === pass2Control!.value ){
        pass2Control!.setErrors(null);
      } else{
        return pass2Control!.setErrors({ noEsIgual: true })
      };
    }
  };

  aceptaTerminos(){
    return !this.registerForm.get('terminos')!.value && this.formSubmitted;
  };

  goDashboard(){
    this.ngZone.run(()=>this.router.navigateByUrl('/'))
  }
}