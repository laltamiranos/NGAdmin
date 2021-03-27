import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideUserComponent } from './components/sides/side-user/side-user.component';
import { SideViewsComponent } from './components/sides/side-views/side-views.component';

import { PanelMenuModule } from 'primeng/panelmenu';
import {TieredMenuModule} from 'primeng/tieredmenu';
import { TooltipModule } from 'primeng/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//Aqui puedo realizar los imports de los componentes PRIMENG para poder modular el PagesModules y no sea tan grande.

import { TableModule } from 'primeng/table';

import { LoadingComponent } from './components/loading/loading.component';
import { TablaVaciaComponent } from './components/tabla-vacia/tabla-vacia.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        // PrimeNG
        PanelMenuModule,
        TieredMenuModule,
        TooltipModule,
        ReactiveFormsModule,
        InputSwitchModule,
        TableModule,
    ],
    declarations: [
        MenuComponent,
        BreadcrumbComponent,
        NavBarComponent,
        SideUserComponent,
        SideViewsComponent,


        LoadingComponent,
        TablaVaciaComponent,
    ],
    exports: [
        MenuComponent,
        BreadcrumbComponent,
        NavBarComponent,
        SideUserComponent,
        SideViewsComponent,

        //Indicadores
        LoadingComponent,
        TablaVaciaComponent,
    ]
})
export class SharedModule { }
