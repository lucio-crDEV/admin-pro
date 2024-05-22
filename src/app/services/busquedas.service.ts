import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment.development';

//modelos
import { Usuario } from '../models/usuario.model';
import { Medico } from '../models/medico.model';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  private resultado : [] = [];

  get token(): string {
    return localStorage.getItem('token') || '';
  };

  get headers(){
    return {
      headers : {
        'x-token': this.token
      }
    }
  }

  constructor( private http: HttpClient) { };

  private transformarUsuarios( resultados: Usuario[] ): Usuario[] {
    return resultados.map(
      user => new Usuario(user.nombre, user.email, '',user.role, user.google, user.img, user.uid) 
    );
  }
  private transformarHospitales( resultados: Hospital[] ): Hospital[] {
    return resultados.map(
      hospital => new Hospital(hospital.nombre, hospital._id, hospital.img, hospital.usuario ) 
    );
  }

  // TODO definir modelo
  private transformarMedicos( resultados: Medico[] ): Medico[] {
    return resultados.map(
      medico => new Medico(medico.nombre, medico._id, medico.img, medico.usuario, medico.hospital) 
    );
  }


  buscar( 
    tipo: 'usuarios'|'medicos'|'hospitales',
    termino: string 
  ) {
    const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`
    return this.http.get<any[]>( url, this.headers)
      .pipe(
        map( (resp: any) => {

          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios( resp.resultados )

            case 'hospitales':
              return this.transformarHospitales( resp.resultados )

            case 'medicos':
              return this.transformarMedicos( resp.resultados )
          
            default:
              return[];
          }
        } )
      );
  }

}