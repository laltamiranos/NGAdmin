import { Injectable } from '@angular/core';
import { HttpClientService } from './implementation/http-client.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../shared/models/usuario.model';

import { map, catchError } from 'rxjs/operators';
import { ExceptionsService } from './exceptions.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Usuario;

  constructor(
    private http: HttpClientService,
    private exceptionsService: ExceptionsService
  ) { }

  login(credential: Usuario) {
    return this.http.post(`${environment.apiPMSAdmin}auth/01`, credential)
      .pipe(
        map(response => {
          if (response) return response;
          this.exceptionsService._credencialesIncorrectas();
        }),
        catchError((error) => of(
          this.exceptionsService._error(error)
        ))
      );
  }

  getUser() {
    return this.http.get(`${environment.apiPMSAdmin}auth/01`)
      .pipe(
        map((response: any) => {
          this.user = response.usuario;
          return response;
        }),
        catchError((error) => of(
          this.exceptionsService._error(error)
        ))
      );
  }

  logoff() {
    this.http.get(`${environment.apiPMSAdmin}auth/02`)
      .subscribe({
        complete: () => {
          localStorage.clear();
          location.href = '/login';
        }
      });
  }

  get userAuth() {
    return this.user;
  }
}
