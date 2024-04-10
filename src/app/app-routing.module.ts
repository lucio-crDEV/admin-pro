import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// módulos
import { PagesRoutingModule } from './pages/pages.routing';

import { NotpagefoundComponent } from './notpagefound/notpagefound.component';
import { AuthRoutingModule } from './auth/auth.routing';

const routes: Routes = [
  // ejemplos documentación:
  // path: '/dashboard' -> PagesRounting
  // path: '/auth'      -> AuthRounting
  // path: '/medicos'   -> MedicosRounting
  // path: '/compras'   -> ComprasRounting

  { path: '**', component: NotpagefoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }