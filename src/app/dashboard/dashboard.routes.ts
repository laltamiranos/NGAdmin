import { Routes } from '@angular/router';

import { HomeComponent } from '../pages/home/home.component';
import { UsuariosComponent } from '../pages/users/users.component';

export const dashboardRoutes: Routes = [
    { path: 'home', component: HomeComponent, data: { pagina: 'Home' } },
    {
        path: 'usuarios',
        data: { pagina: 'Lista de Usuarios'},
        component: UsuariosComponent
    },{
        path: '**',
        redirectTo: 'home'
    }


];
