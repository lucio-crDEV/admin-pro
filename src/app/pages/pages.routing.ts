import { Routes, RouterModule } from "@angular/router"
import { NgModule } from "@angular/core"

import { authGuard } from "../guards/auth.guard"

import { PagesComponent } from "./pages.component"
import { DashboardComponent } from "./dashboard/dashboard.component"
import { ProgressComponent } from "./progress/progress.component"
import { Grafica1Component } from "./grafica1/grafica1.component"
import { AccountSettingsComponent } from "./account-settings/account-settings.component"
import { PromesasComponent } from "./promesas/promesas.component"
import { RxjsComponent } from "./rxjs/rxjs.component"

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ authGuard ],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Main' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
            { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de Cuenta' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PagesRoutingModule { }