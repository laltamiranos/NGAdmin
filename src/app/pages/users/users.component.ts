import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { VariablesService } from 'src/app/services/variableGL.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { GetUsersAction, DeleteUserAction } from 'src/app/store/actions';
import { Toast } from 'src/app/shared/models/toast.model';
import swal from 'sweetalert';
import { SlideAnimation } from 'src/app/shared/animations/slide';

@Component({
  selector: 'app-usuarios',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [SlideAnimation]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  cantidadRows = 0;

  accion: string;
  modalUsuarios: boolean = false;
  contadorModal = 0;

  selectedUser: Usuario;

  dataTable: any;
  cols: any;

  agregar: boolean;
  actualizar: boolean;
  borrar: boolean;

  usersSubcripcion: Subscription = new Subscription();
  empresaSubcripcion: Subscription = new Subscription();

  loading: boolean;
  loadingPermisos: boolean;
  loadingGetUsersSubscription: Subscription = new Subscription();
  loadGetPermisosSubscription: Subscription = new Subscription();

  texto: string = "Cargando datos, por favor espera.";
  textoVacio: string ="Actualmente no cuentas con ningún Usuario.";

  constructor(
    private variablesService: VariablesService,
    private store: Store<AppState>
  ) {
    this.cantidadRows = this.variablesService.getStatusPantalla();
    this.usersSubcripcion = this.store.select('users', 'list').subscribe((users: Usuario[]) => {
      if (users.length > 0) {
        this.dataTable = this.variablesService.getDataTable(users);
      }
    });
  }

  ngOnInit() {
    this.loadingGetUsersSubscription = this.store.select('users', 'loading').subscribe(loadingGet => this.loading = loadingGet);
    this.loadGetPermisosSubscription = this.store.select('users', 'loading').subscribe(loadGetPermisos => 
      { 
        if(!loadGetPermisos){
          if(this.accion == "permisos"){
            this.modalUsuarios = true;
          } 
        }
      });
    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'correo', header: 'Correo' },
      { field: 'telefono', header: 'Telefono' },
      { field: 'habilitado', header: 'Habilitado' },
    ];
    this.store.dispatch(new GetUsersAction());
  }

  ngOnDestroy() {
    if (this.empresaSubcripcion) {
      this.empresaSubcripcion.unsubscribe();
    }
    if (this.usersSubcripcion) {
      this.usersSubcripcion.unsubscribe();
    }
    if(this.loadingGetUsersSubscription){
      this.loadingGetUsersSubscription.unsubscribe();
    }
  }

  updateUser(user: Usuario) {
    if (this.modalUsuarios) return;
      this.selectedUser = user;
      this.accion = 'update';
      this.modalUsuarios = true;
  }

  openModal(accion: string) {
    if (this.modalUsuarios) return;
      this.accion = accion;
      this.modalUsuarios = true;
  }

  deleteUser(user: Usuario) {
    swal({
      title: `¿Quieres borrar este Usuario?`,
      text: `Usuario: ${user.correo}`,
      icon: "info",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    })
      .then((willOK) => {
        if (willOK) {
          this.store.dispatch(new DeleteUserAction(user));
          this.variablesService.toast.next(new Toast('success', 'Exito', 'Borrando el Usuario', 2000));
        }
      });
  }

  closeModal() {
    this.selectedUser = null;
    this.modalUsuarios = false;
    this.contadorModal = 0;
    this.accion = null;
  }
}