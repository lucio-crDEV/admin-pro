import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formSubmitted = false;
  public auth2: any;
  public loginForm: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone) {

    this.loginForm = this.fb.group({
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [ false ]
    });

  }

  ngAfterViewInit(): void {
    this.googleInit()
  };

  googleInit() {
    google.accounts.id.initialize({
      client_id: "988739077409-rc5d5jj9asc58p59ugec3gntafkn52f8.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse( response )
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  };

  handleCredentialResponse(response: any) {
    this.usuarioService.loginGoogle( response.credential)
      .subscribe( resp => {
        this.usuarioService.goDashboard();
      })
  };


  login() {
    this.formSubmitted = true;
    
    if(this.loginForm.value.email === '' || this.loginForm.value.password === '' ){
       // Alert error
       Swal.fire({
        title: 'Error',
        text: 'Credenciales invalidas',
        icon: 'error',
        confirmButtonColor: "#d33"
      });
      return;
    }
    
    this.usuarioService.loginUsuario(this.loginForm.value)
      .subscribe({
        next: resp => {
          
          if (this.loginForm.get('remember')!.value) {
            localStorage.setItem('email', this.loginForm.get('email')!.value)
          } else {
            localStorage.removeItem('email')
          };

          // Navegar al dashboard
          this.usuarioService.goDashboard()
        },
        error: (err: any) => {
          if( !err.error.msg ){
            Swal.fire({
              title: 'Error',
              text: 'Error en las credenciales',
              icon: 'error',
              confirmButtonColor: "#d33"
            });
          }
          // Alert error
          Swal.fire({
            title: 'Error',
            text: err.error.msg,
            icon: 'error',
            confirmButtonColor: "#d33"
          });
        }
      })
  };
  
  // Validaciones
  campoNoValido( campo: string ): boolean {
    
    if( this.loginForm.get(campo)!.invalid && this.formSubmitted ){ 
      return true;
     } else {
      return false;
     }
  };

}