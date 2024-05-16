import { environment } from "../../environments/environment.development";

const base_url = environment.base_url

export class Usuario {

  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public role?: string,
    public google?: boolean,
    public img?: string,
    public uid?: string,
  ) { };

  get imagenUrl() {

    const img = this.img || ''

    // retorna imagen si es cargada con google y comienza con HTTPS
    if ( img.includes('https') ) {
      return this.img;
    } else if ( this.img ) {
    // returna la imagen default si no existe, o la cargada por el usuario
      return `${ base_url }/uploads/usuarios/${ this.img }`;
    } else {
      return `${ base_url }/uploads/usuarios/no-image`;
    };
  }
};