import { Action } from '@ngrx/store';
import { Usuario } from 'src/app/shared/models/usuario.model';

export const SET_USER = '[AUTH] Set User';
export const SET_USER_FAIL = '[AUTH] Set User FAIL';
export const SET_USER_SUCCESS = '[AUTH] Set User SUCCESS';

//#region GET_USERS
export class SetUserAction implements Action {
    readonly type = SET_USER;
};

export class SetUserActionFail implements Action {
    readonly type = SET_USER_FAIL;
    constructor(public payload: any) { }
};

export class SetUserActionSuccess implements Action {
    readonly type = SET_USER_SUCCESS;
    constructor(public user: Usuario) { }
};
//#endregion

export type authAcciones =
    SetUserAction |
    SetUserActionFail |
    SetUserActionSuccess;