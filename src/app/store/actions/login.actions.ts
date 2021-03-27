import { Action } from '@ngrx/store';
import { Usuario } from 'src/app/shared/models/usuario.model';

export const GET_LOGIN = '[LOGIN] Get User Credentials';
export const GET_LOGIN_FAIL = '[LOGIN] Get User Credentials FAIL';
export const GET_LOGIN_SUCCESS = '[LOGIN] Get User Credentials SUCCESS';

export class GetLoginAction implements Action {
    readonly type = GET_LOGIN;
    constructor(public user: Usuario) { }
};

export class GetLoginActionFail implements Action {
    readonly type = GET_LOGIN_FAIL;
    constructor(public payload: any) { }
};

export class GetLoginActionSuccess implements Action {
    readonly type = GET_LOGIN_SUCCESS;
    constructor(public user: Usuario) { }
};

export type loginActions =
    GetLoginAction |
    GetLoginActionFail |
    GetLoginActionSuccess;