import { Component, OnInit, ChangeDetectorRef, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VariablesService } from '../services/variableGL.service';
import { MessageService } from 'primeng/api';
import { Toast } from '../shared/models/toast.model';
import { flipInXAnimation } from '../shared/animations/flipinX';
import { fadeAnimation } from '../shared/animations/fade';
import { SlideAnimation } from '../shared/animations/slide';
import Swal from 'sweetalert';
import { SwalModel } from '../shared/models/swal.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { Usuario } from '../shared/models/usuario.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [flipInXAnimation, fadeAnimation, SlideAnimation],
  providers: [MessageService],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userAuth: Usuario;
  toastSubcripcion: Subscription = new Subscription();
  swalSubcripcion: Subscription = new Subscription();

  mostrarSideUser: boolean;
  contador: number = 0;

  mostrarSideViews: boolean;
  contadorSideViews: number = 0;

  mostrarSideNav: boolean;

  sideUserSubcripcion: Subscription = new Subscription();
  sideViewsSubcripcion: Subscription = new Subscription();
  userSubcripcion: Subscription = new Subscription();
  sideBarSubcripcion: Subscription = new Subscription();

  changeMenuSubcripcion: Subscription = new Subscription();

  constructor(
    private variablesService: VariablesService,
    private messageService: MessageService,
    private cdRef: ChangeDetectorRef,
    private store: Store<AppState>
  ) {
    this.userSubcripcion = this.store.select('auth', 'user').subscribe((user: any) => {
      if (user && user.id)
        this.userAuth = user;
    });

    // Tipo de menu en pantalla (Laptop +)
    this.changeMenuSubcripcion = this.variablesService.changeTipoMenu.subscribe((tipo: boolean) => {
      let menu = document.querySelector('#menu');
      let contenido = document.querySelector('#Contenido');
      let sidenav = document.querySelector('#sidenav');
      let carta = document.querySelector('#carta');
      let contenedor = document.querySelector('#contenedor');

      if (tipo) {
        menu.classList.toggle("sideBar");
        contenido.classList.toggle("contenidoNormal");
        sidenav.classList.toggle("sideNav");
        carta.classList.toggle("contenido-outled");

        menu.classList.toggle("sideBar-chico");
        contenido.classList.toggle("contenido-chico");
        sidenav.classList.toggle("sideNav-chico");
        carta.classList.toggle("contenido-outled-chico");
        
      } else {
        menu.classList.toggle("sideBar-chico");
        contenido.classList.toggle("contenido-chico");
        sidenav.classList.toggle("sideNav-chico");
        carta.classList.toggle("contenido-outled-chico");

        menu.classList.toggle("sideBar");
        contenido.classList.toggle("contenidoNormal");
        sidenav.classList.toggle("sideNav");
        carta.classList.toggle("contenido-outled");

        
      }
    });

    // Side User
    this.sideUserSubcripcion = this.variablesService.showSideUser.subscribe(value => {
      this.mostrarSideUser = value;
    });

    //Mobile
    this.sideViewsSubcripcion = this.variablesService.showSideViews.subscribe(value => {
      this.mostrarSideViews = value;
    });
    this.sideBarSubcripcion = this.variablesService.showSideBar.subscribe((state: boolean) => {
      let sideBar = document.querySelector('.sideBar');
      if (sideBar) {
        if (state)
          sideBar.classList.add('toggled');
        else
          sideBar.classList.remove('toggled');
      }
    });

    // Message / Notification
    this.toastSubcripcion = this.variablesService.toast.subscribe((toast: Toast) => {
      if (toast)
        this.messageService.add({ key: 'toast', severity: toast.estado, summary: toast.titulo, detail: toast.mensaje, life: toast.segundos, closable: false });
    });
    this.swalSubcripcion = this.variablesService.swal.subscribe((swal: SwalModel) => {
      if (swal) return Swal(swal.titulo, swal.mensaje, swal.estado);
    });

  }

  ngOnInit() {
    if (window.screen.width < 767)
      this.mostrarSideNav = false;
    else
      this.mostrarSideNav = true;
  }

  ngOnDestroy() {
    if (this.sideUserSubcripcion) {
      this.sideUserSubcripcion.unsubscribe();
    }
    if (this.toastSubcripcion) {
      this.toastSubcripcion.unsubscribe();
    }
    if (this.userSubcripcion) {
      this.userSubcripcion.unsubscribe();
    }
    if (this.changeMenuSubcripcion) {
      this.changeMenuSubcripcion.unsubscribe();
    }
  }

  openSidebar() {
    let sidebar = document.querySelector(".page-wrapper");
    sidebar.classList.add("toggled");
  }
  closeSidebar() {
    let sidebar = document.querySelector(".page-wrapper");
    sidebar.classList.remove("toggled");
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  clickSides($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  @HostListener('document:click', ['$event']) clickedOutside($event) {
    if (this.mostrarSideUser && this.contador == 0) {
      this.mostrarSideUser = true;
      this.mostrarSideViews = false;
      this.contador++;
      this.contadorSideViews = 0;
    }
    else if (this.mostrarSideUser && this.contador == 1) {
      this.emptySides();
    }
    else if (this.mostrarSideViews && this.contadorSideViews == 0) {
      this.mostrarSideUser = false;
      this.mostrarSideViews = true;
      this.contador = 0;
      this.contadorSideViews++;
    }
    else if (this.mostrarSideViews && this.contadorSideViews == 1) {
      this.emptySides();
    }
  }

  emptySides() {
    this.mostrarSideUser = false;
    this.contador = 0;
    this.mostrarSideViews = false;
    this.contadorSideViews = 0;
    this.variablesService.showSideUser.next(false);
  }
}
