import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';

import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs';

export const canMatch: CanMatchFn = () => {

  const usuarioService = inject(UsuarioService);
  const router = inject(Router);
  
  return usuarioService.validarToken()
    .pipe(
      tap( estaAutenticado => {
        if( !estaAutenticado ) {
          localStorage.removeItem('menu');
          localStorage.removeItem('token');
          router.navigateByUrl('/login');
        }
      })
    )
};

export const authGuard: CanActivateFn = (route, state) => {
  
  const userService = inject(UsuarioService);
  const router = inject(Router);
  
  return userService.validarToken()
    .pipe(
      tap( (estaAutenticado) => {
        if ( !estaAutenticado ) {
          localStorage.removeItem('menu');
          localStorage.removeItem('token');
          router.navigateByUrl('/login');
        }
      })
    )
     
};
