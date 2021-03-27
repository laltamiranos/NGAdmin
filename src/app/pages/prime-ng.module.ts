import { NgModule } from '@angular/core';
import { TabViewModule} from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import {InputTextModule} from 'primeng/inputtext';


@NgModule({
    imports: [
        TabViewModule,
        SidebarModule,
        ToastModule,
        ScrollPanelModule,
        TableModule,
        InputSwitchModule,
        DropdownModule,
        TooltipModule,
        AutoCompleteModule,
        SidebarModule,
        KeyFilterModule,
        DialogModule,
        BreadcrumbModule,
        InputTextModule,
    ],
    exports: [
        TabViewModule,
        SidebarModule,
        ToastModule,
        ScrollPanelModule,
        TableModule,
        InputSwitchModule,
        DropdownModule,
        TooltipModule,
        AutoCompleteModule,
        SidebarModule,
        KeyFilterModule,
        DialogModule,
        BreadcrumbModule,
        InputTextModule
    ]
})
export class PrimeNGModule { }
