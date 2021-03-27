import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';

//#endregion

import { PrimeNGModule } from './prime-ng.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        DashboardRoutingModule,
        // StoreModule.forFeature('viewUsers', usersReducer),
        PrimeNGModule,
    ],
    declarations: [
        DashboardComponent,
        HomeComponent,
        //Usuarios
        UsuariosComponent,
        AddUserComponent,
        UpdateUserComponent,
    ]
})
export class PagesModule { }
