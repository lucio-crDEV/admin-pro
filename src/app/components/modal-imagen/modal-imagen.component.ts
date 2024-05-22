import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { FileUploadService } from '../../services/file-upload.service';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: ``
})
export class ModalImagenComponent {

  public imagenSubir!: File;
  public imgTemp: string | ArrayBuffer | null = null;

  constructor( public modalImagenService: ModalImagenService,
               public fileUploadService: FileUploadService
  ) {};

  cerrarModal(){
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  };

  
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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
      .actualizarFoto(this.imagenSubir, tipo, id )
      .then( ( img ) => { 
        // si no hay imagen
      if( img.ok === false ){
          Swal.fire({
            title: 'Error',
            text: img.msg,
            icon: 'error',
            timerProgressBar: true,
            showConfirmButton: false,
            timer: 3000
          })
          this.cerrarModal();
        } else if (img){
          // actualizar imagen 
          // this.usuario.img = img
          this.modalImagenService.nuevaImagen.emit( img );
          this.cerrarModal();
          Swal.fire({
            title: 'Guardado',
            text: 'La imagen fue modificada',
            icon: 'success',
            timerProgressBar: true,
            showConfirmButton: false,
            timer: 2000
          })
        }
      }).catch(
        (err)=>{
          console.log('Nuevo error:', err)
        }
      )

  };

}
