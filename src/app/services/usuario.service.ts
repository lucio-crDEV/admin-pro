import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment.development';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';


declare const google:any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public handleCredentialResponse: any;
  public usuario!: Usuario;

  constructor( private http: HttpClient, 
               private router: Router, 
               private ngZone: NgZone ) { 

    };


  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string { 
    return this.usuario.uid || '';
  }


  validarToken(): Observable<boolean> {

    return this.http.get(`${ base_url }/login/renew`,{
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        const { email, google, nombre, role, img, uid } = resp.usuario;
        this.usuario = new Usuario( nombre, email, '', role, google, img, uid );
        localStorage.setItem('token', resp.token );
        return true;
      }),
      catchError( error => of(false) )
    );
  }

  crearUsuario( formData: RegisterForm ){
    return this.http.post( `${ base_url }/usuarios`, formData )
      .pipe(
        tap( (resp: any) =>
            localStorage.setItem('token', resp.token )
         )
      );
  }

  // Forma de tipar sin definir interface
  actualizarUsuario( data: { email: string, nombre: string, role: string }){

    data = {
      ...data,
      role: this.usuario.role!
    };

    return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    })

  }

  loginUsuario( formData: LoginForm ){
    return this.http.post( `${ base_url }/login`, formData )
      .pipe(
        tap( (resp: any) =>
            localStorage.setItem('token', resp.token )
         )
      )
  };


  loginGoogle( token: string ){
    return this.http.post(`${ base_url }/login/google`, { token })
      .pipe(
        tap(( resp:any )=>{
          localStorage.setItem('token', resp.token)
        })
      )
  }

  logout(){
    localStorage.removeItem('token');    

    google.accounts.id.revoke( 
      'ale.perez43455@gmail.com', 
      ()=>{
          this.router.navigate(['/login'])
      })
    }

    goDashboard(){
      this.ngZone.run(()=>this.router.navigateByUrl('/'))
    }
};