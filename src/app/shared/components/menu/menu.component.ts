import { Component, OnInit, OnDestroy } from '@angular/core';
import { VariablesService } from 'src/app/services/variableGL.service';
import { Toast } from '../../models/toast.model';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  arboles: any[] = [];
  items: MenuItem[];
  itemsMenuChico: MenuItem[] = [];
  nodos: any;

  user: Usuario;

  userSubcripcion: Subscription = new Subscription();
  empresaSubcripcion: Subscription = new Subscription();

  menuChico: boolean = false;
  menuSubcripcion: Subscription = new Subscription();

  constructor(
    private variablesService: VariablesService,
    private store: Store<AppState>
  ) {
    this.userSubcripcion = this.store.select('auth', 'user').subscribe((user: any) => {
      if (user && user.id) {
        console.log("secreó el menú");
        
        this.user = user.usuario;
        this.createMenu();
      }
    });
    this.menuSubcripcion = this.variablesService.changeTipoMenu.subscribe((estado: boolean) => {
      if (estado)
        this.menuChico = true;
      else
        this.menuChico = false;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.empresaSubcripcion) {
      this.empresaSubcripcion.unsubscribe();
    }
    if (this.userSubcripcion) {
      this.userSubcripcion.unsubscribe();
    }
    if (this.menuSubcripcion) {
      this.menuSubcripcion.unsubscribe();
    }
  }

  createMenu() {
    this.items = [
      {
        label: 'Users',
        icon:'pi pi-fw pi-user',
        routerLink: ['/usuarios'],
      },  
    ]

    console.log(this.items);

    this.addModuloInicio();

  }

  getClick(evento: any) {
    this.variablesService.showSideBar.next(false);
  }

  addModuloInicio() {
    this.items.unshift(
      { label: 'Home', icon: 'fas fa-home fa-2x', routerLink: ['/home'] },
      { label: "Acciones", separator: true }
    );
  }

  changeMenu() {
    let menu = document.querySelector('#tipoMenu');
    menu.classList.toggle("active");
    menu.classList.toggle("not-active");

    if (menu.classList[1] == 'active'){
      this.variablesService.changeTipoMenu.next(true);
      
      this.itemsMenuChico = [];
      this.itemsMenuChico = [...this.items].map(item => ({...item}));
      let width = window.screen.width;
      this.itemsMenuChico.forEach(item => {
          if(item.label.match("Home") && width > 640 && width < 1920){
            item.icon = 'fas fa-home';
          }
          item.label = '';
      });
    }else{
      this.variablesService.changeTipoMenu.next(false);
    }
  }
}

