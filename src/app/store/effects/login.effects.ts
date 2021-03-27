import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import * as loginActions from '../actions/login.actions';
import * as authActions from '../actions/auth.actions';

import { of } from "rxjs";
import { map, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/shared/models/usuario.model';

@Injectable()

export class loginEffects {
    constructor(
        private actions$: Actions,
        public authService: AuthService
    ) { }

    @Effect()
    cargarLoading$ = this.actions$.ofType(loginActions.GET_LOGIN)
        .pipe(
            switchMap((action: loginActions.GetLoginAction) => {
                return this.authService.login(action.user)
                    .pipe(
                        map((usuario: Usuario) => new loginActions.GetLoginActionSuccess(usuario)),
                        catchError(error => of(new loginActions.GetLoginActionFail(error)))
                    )
            })
        );
};