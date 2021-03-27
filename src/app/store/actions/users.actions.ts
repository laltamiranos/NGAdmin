import { Action } from '@ngrx/store';
import { Usuario } from 'src/app/shared/models/usuario.model';

export const GET_USERS = '[USERS] Get Users';
export const GET_USERS_FAIL = '[USERS] Get Users FAIL';
export const GET_USERS_SUCCESS = '[USERS] Get Users SUCCESS';

export const POST_USER = '[USERS] Post User';
export const POST_USER_FAIL = '[USERS] Post User FAIL';
export const POST_USER_SUCCESS = '[USERS] Post User SUCCESS';

export const DELETE_USER = '[USERS] Delete User';
export const DELETE_USER_FAIL = '[USERS] Delete User FAIL';
export const DELETE_USER_SUCCESS = '[USERS] Delete User SUCCESS';

export const PUT_USER = '[USERS] Put User';
export const PUT_USER_FAIL = '[USERS] Put User FAIL';
export const PUT_USER_SUCCESS = '[USERS] Put User SUCCESS';

//#region GET_USERS
export class GetUsersAction implements Action {
    readonly type = GET_USERS;
};

export class GetUsersActionFail implements Action {
    readonly type = GET_USERS_FAIL;
    constructor(public payload: any) { }
};

export class GetUsersActionSuccess implements Action {
    readonly type = GET_USERS_SUCCESS;
    constructor(public users: Usuario[]) { }
};
//#endregion

//#region  POST_USER
export class PostUserAction implements Action {
    readonly type = POST_USER;
    constructor(public user: Usuario) { }
};
export class PostUserActionFAIL implements Action {
    readonly type = POST_USER_FAIL;
    constructor(public payload: any) { }
};
export class PostUserActionSUCCESS implements Action {
    readonly type = POST_USER_SUCCESS;
    constructor(public newUser: Usuario) { }
};
//#endregion

//#region  DELETE_USER
export class DeleteUserAction implements Action {
    readonly type = DELETE_USER;
    constructor(public user: Usuario) { }
};
export class DeleteUserActionFAIL implements Action {
    readonly type = DELETE_USER_FAIL;
    constructor(public payload: any) { }
};
export class DeleteUserActionSUCCESS implements Action {
    readonly type = DELETE_USER_SUCCESS;
    constructor(public deleteUser: Usuario) { }
};
//#endregion

//#region  PUT_USER
export class PutUserAction implements Action {
    readonly type = PUT_USER;
    constructor(public usuario: Usuario) { }
};
export class PutUserActionFAIL implements Action {
    readonly type = PUT_USER_FAIL;
    constructor(public payload: any) { }
};
export class PutUserActionSUCCESS implements Action {
    readonly type = PUT_USER_SUCCESS;
    constructor(public updateUser: Usuario) { }
};
//#endregion

export type usersActions =
    GetUsersAction |
    GetUsersActionFail |
    GetUsersActionSuccess |

    PostUserAction |
    PostUserActionFAIL |
    PostUserActionSUCCESS |

    DeleteUserAction |
    DeleteUserActionFAIL |
    DeleteUserActionSUCCESS |

    PutUserAction |
    PutUserActionFAIL |
    PutUserActionSUCCESS;
