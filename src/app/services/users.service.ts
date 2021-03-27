import { Injectable } from '@angular/core';
import { HttpClientService } from './implementation/http-client.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../shared/models/usuario.model';

import { Subscription, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ExceptionsService } from './exceptions.service';
import { VariablesService } from './variableGL.service';
import { Toast } from 'src/app/shared/models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  putHabilitadoSubcripcion: Subscription = new Subscription();

  constructor(
    private http: HttpClientService,
    private exceptionsService: ExceptionsService,
    private variablesService: VariablesService
  ) { }

  //#region GET
  getUsers() {
    return this.http.get(`${environment.apiPMSAdmin}users/01`)
      .pipe(
        map((response: any) => response),
        catchError((error) => of(
          this.exceptionsService._error(error)
        ))
      );
  }
  //#endregion

  //#region POST
  postUser(usuario: Usuario) {
    return this.http.post(`${environment.apiPMSAdmin}users/02`, { usuario })
      .pipe(
        map((response: any) => response),
        catchError((error) => of(
          this.exceptionsService._error(error)
        ))
      );
  }
  //#endregion

  //#region PUT
  putUser(usuario: Usuario) {
    return this.http.put(`${environment.apiPMSAdmin}users/03`, { usuario })
      .pipe(
        map((response: any) => {
          if(response){
            this.variablesService.toast.next(new Toast('success','Exito.','Datos Actualizados', 2000));
          }else{
              this.variablesService.toast.next(new Toast('error', 'Error', 'Ah ocurrido un error, ya existe la información que ingresó! :(', 2000));
          }
          return response;
        }),
        catchError((error) => of(
          this.exceptionsService._error(error)
        ))
      );
  }

  //#region DELETE
  deleteUser(usuario: Usuario) {
    return this.http.delete(`${environment.apiPMSAdmin}users/04?idUsuario=${usuario.id}`)
      .pipe(
        map((response: any) => response),
        catchError((error) => of(
          this.exceptionsService._error(error)
        ))
      );
  }

  cancelSubsctiptions() {
    this.putHabilitadoSubcripcion.unsubscribe();
  }
  //#endregion
}
