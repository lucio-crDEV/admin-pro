import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment.development';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { Router } from '@angular/router';


declare const google:any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public handleCredentialResponse: any;

  constructor( private http: HttpClient, 
               private router: Router, 
               private ngZone: NgZone ) { 

    };

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`,{
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token )
      }),
      map( resp => true ),
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
      'correoenduro@gmail.com', 
      ()=>{
        this.ngZone.run(()=>this.router.navigateByUrl('/'))
      })
    }

    goDashboard(){
      this.ngZone.run(()=>this.router.navigateByUrl('/'))
    }
};