import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import * as usersActions from '../actions';

import { of } from "rxjs";
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { VariablesService } from 'src/app/services/variableGL.service';

@Injectable()

export class usersEffects {
    constructor(
        private actions$: Actions,
        public usersService: UsersService,
        public variablesService: VariablesService,
    ) { }

    @Effect()
    cargarUsers$ = this.actions$.ofType(usersActions.GET_USERS)
        .pipe(
            switchMap(() => {
                return this.usersService.getUsers()
                    .pipe(
                        map((usuarios: Usuario[]) => new usersActions.GetUsersActionSuccess(usuarios)),
                        catchError(error => of(new usersActions.GetUsersActionFail(error)))
                    )
            })
        );

    @Effect()
    postUser$ = this.actions$.ofType(usersActions.POST_USER)
        .pipe(
            switchMap((action: usersActions.PostUserAction) => {
                return this.usersService.postUser(action.user)
                    .pipe(
                        map((user: Usuario) => new usersActions.PostUserActionSUCCESS(user)),
                        catchError(error => of(new usersActions.PostUserActionFAIL(error)))
                    )
            })
        );

    @Effect()
    deleteUser$ = this.actions$.ofType(usersActions.DELETE_USER)
        .pipe(
            switchMap((action: usersActions.DeleteUserAction) => {
                return this.usersService.deleteUser(action.user)
                    .pipe(
                        map(() => new usersActions.DeleteUserActionSUCCESS(action.user)),
                        catchError(error => of(new usersActions.DeleteUserActionFAIL(error)))
                    )
            })
        );

    @Effect()
    putUser$ = this.actions$.ofType(usersActions.PUT_USER)
        .pipe(
            switchMap((action: usersActions.PutUserAction) => {
                return this.usersService.putUser(action.usuario)
                    .pipe(
                        map((updateUser: Usuario) => new usersActions.PutUserActionSUCCESS(updateUser)),
                        catchError(error => of(new usersActions.PutUserActionFAIL(error)))
                    )
            })
        );

};
