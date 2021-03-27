import { Component, OnInit, OnDestroy } from '@angular/core';
import { fadeAnimation } from '../shared/animations/fade';
import { Usuario } from '../shared/models/usuario.model';
import { MessageService } from 'primeng/api';

import * as loginActions from '../store/actions/';

import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { Subscription } from 'rxjs';
import { VariablesService } from '../services/variableGL.service';
import { Toast } from '../shared/models/toast.model';

import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeAnimation],
  providers: [MessageService, Md5],
})
export class LoginComponent implements OnInit, OnDestroy {

  toastSubcripcion: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private messageService: MessageService,
    private variablesService: VariablesService
  ) {
    this.toastSubcripcion = this.variablesService.toastLogin.subscribe((toast: Toast) => {
      if (toast)
        this.messageService.add({ key: 'toast', severity: toast.estado, summary: toast.titulo, detail: toast.mensaje, life: toast.segundos, closable: false });
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.toastSubcripcion) {
      this.toastSubcripcion.unsubscribe();
    }
  }

  getDataLogin(e) {
    if (e) {
      let user: Usuario = {
        correo: e.correo,
        contrasena: Md5.hashStr(e.contrasena)
      }

      this.store.dispatch(new loginActions.GetLoginAction(user))
    }
  }
}
