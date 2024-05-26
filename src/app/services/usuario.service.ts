import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";

import { environment } from '../../environments/environment.development';

import { Usuario } from '../models/usuario.model';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';


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
               private ngZone: NgZone ) {};


  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role!
  }

  get uid(): string { 
    return this.usuario.uid || '';
  }

  get headers(){
    return {
      headers : {
        'x-token': this.token
      }
    }
  }

  guardarLocalStorage( token: string, menu: any ){
    localStorage.setItem('token', token );
    localStorage.setItem('menu', JSON.stringify(menu) );
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
        this.guardarLocalStorage( resp.token, resp.menu );
        return true;
      }),
      catchError( err => {
        return of(false)
      } )
    );
  }

  crearUsuario( formData: RegisterForm ){
    return this.http.post( `${ base_url }/usuarios`, formData )
      .pipe(
        tap( (resp: any) =>{
          this.guardarLocalStorage( resp.token, resp.menu );
        })
      );
  }

  // Forma de tipar sin definir interface
  actualizarUsuario( data: { email: string, nombre: string, role: string }){

    data = {
      ...data,
      role: this.usuario.role!
    };

    return this.http.put( `${ base_url }/usuarios/${ this.uid }`, data, this.headers )

  }

  loginUsuario( formData: LoginForm ){
    return this.http.post( `${ base_url }/login`, formData )
      .pipe(
        tap( (resp: any) => {
          this.guardarLocalStorage( resp.token, resp.menu );
        })
      )
  };


  loginGoogle( token: string ){
    return this.http.post(`${ base_url }/login/google`, { token })
      .pipe(
        tap(( resp:any )=>{
          this.guardarLocalStorage( resp.token, resp.menu );
        })
      )
  };

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    google.accounts.id.revoke( 'ale.perez43455@gmail.com')
    
    this.ngZone.run( ()=> this.router.navigateByUrl('/login'));
  };

  goDashboard(){
      this.ngZone.run(()=>this.router.navigateByUrl('/'))
  };

  cargarUsuarios( desde: number = 0 ){
    // http://localhost:3000/api/usuarios?desde=0
    const url = `${ base_url }/usuarios?desde=${ desde }`

    return this.http.get<CargarUsuario>( url, this.headers)
      .pipe(
        map( resp =>{
          const usuarios = resp.usuarios.map( user => new Usuario(user.nombre, user.email, '',user.role, user.google, user.img, user.uid)  );

          return {
            total: resp.total,
            usuarios
          };
        } )
      )
  };

  eliminarUsuario( usuario: Usuario ){
    const url = `${ base_url }/usuarios/${ usuario.uid }`;
    return this.http.delete( url, this.headers);
  };

  guardarUsuario( usuario: Usuario ){
    return this.http.put( `${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers )
  }

};