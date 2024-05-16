import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: ``
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService) {
                
                this.usuario = usuarioService.usuario;
                
                this.perfilForm = new FormGroup({
                  nombre: new FormControl(this. usuario.nombre, [Validators.required]),
                  email: new FormControl(this.usuario.email, [Validators.required, Validators.email])
                })

  }


  ngOnInit(): void {

  };


  actualizarPerfil() {
    this.usuarioService.actualizarUsuario( this.perfilForm.value )
      .subscribe({
        next: () => {
          const { nombre, email } = this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;
  
          Swal.fire({
            title: 'Guardado',
            text: 'Cambios fueron guardados',
            icon: 'success',
            timerProgressBar: true,
            showConfirmButton: false,
            timer: 2000
          })
        },
        error: (err)=>{
        Swal.fire({
            title: 'Error',
            text: err.error.msg,
            icon: 'error',
            timerProgressBar: true,
            showConfirmButton: false,
            timer: 3000
          })
        }
      })
  }

  cambiarImagen( file:File ){
    
    this.imagenSubir = file;

    if( !file ){ return this.imgTemp = null; }

    const reader = new FileReader();
    reader.readAsDataURL( file );


    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
    
    return;
  };

  subirImagen(){

    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid! )
      .then( ( img ) => { 
        
        // si no hay imagen
        if( !img ){
          Swal.fire({
            title: 'Error',
            text: 'No es una extensión de archivo permitida',
            icon: 'error',
            timerProgressBar: true,
            showConfirmButton: false,
            timer: 3000
          })
        }
        // actualizar imagen 
        this.usuario.img = img
        Swal.fire({
          title: 'Guardado',
          text: 'La imagen fue modificada',
          icon: 'success',
          timerProgressBar: true,
          showConfirmButton: false,
          timer: 2000
        })
      });

  };

}
