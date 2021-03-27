import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import * as authActions from '../actions/auth.actions';

import { of } from "rxjs";
import { map, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()

export class authEffects {
    constructor(
        private actions$: Actions,
        public authService: AuthService
    ) { }

    @Effect()
    cargarUser$ = this.actions$.ofType(authActions.SET_USER)
        .pipe(
            switchMap(() => {
                return this.authService.getUser()
                    .pipe(
                        map(usuario => new authActions.SetUserActionSuccess(usuario)),
                        catchError(error => of(new authActions.SetUserActionFail(error)))
                    )
            })
        );
};
