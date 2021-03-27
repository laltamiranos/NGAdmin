import * as fromUsers from '../actions/users.actions';

import { Usuario } from 'src/app/shared/models/usuario.model';

export interface UsersState {
    list: Usuario[];
    permisions: string;
    loaded: boolean;
    loading: boolean;
    error: any;
};

const initState: UsersState = {
    list: [],
    permisions: null,
    loaded: false,
    loading: false,
    error: null
};

export function usersReducer(state = initState, action: fromUsers.usersActions): UsersState {
    switch (action.type) {
        //#region GET_USERS
        case fromUsers.GET_USERS:
            return {
                ...state,
                loading: true,
                error: null
            };
        case fromUsers.GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                list: [
                    ...action.users.map(user => {
                        return {
                            ...user
                        }
                    })
                ]
            };
        case fromUsers.GET_USERS_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: {
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url
                }
            };
        //#endregion
        //#region POST_USER
        case fromUsers.POST_USER:
            return {
                ...state,
                loading: true,
                error: null
            }
        case fromUsers.POST_USER_SUCCESS:
            return {
                ...state,
                list: [...state.list, action.newUser],
                loading: false,
                loaded: true,
                error: null
            };
        case fromUsers.POST_USER_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: {
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url
                }
            };
        //#endregion
        //#region DELETE_USER
        case fromUsers.DELETE_USER:
            return {
                ...state,
                loading: true,
                error: null
            }
        case fromUsers.DELETE_USER_SUCCESS:
            return {
                ...state,
                list: [...state.list.filter(user => {
                    if (user.id != action.deleteUser.id) {
                        return {
                            user
                        };
                    }
                })],
                loading: false,
                loaded: true,
                error: null
            };
        case fromUsers.DELETE_USER_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: {
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url
                }
            };
        //#endregion
        //#region PUT_USER    
        case fromUsers.PUT_USER:
            return {
                ...state,
                loading: true,
                error: null
            };
        case fromUsers.PUT_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                list: [
                    ...state.list.map(editItem => {
                        if (editItem.id === action.updateUser.id) {
                            return {
                                ...editItem,
                                usuario: action.updateUser.usuario,
                                correo: action.updateUser.correo,
                                sexo: action.updateUser.sexo,
                                estatus: action.updateUser.estatus,
                                fechaCreacion: action.updateUser.fechaCreacion
                            };
                        } else {
                            return editItem;
                        }
                    })
                ]
            };
        case fromUsers.PUT_USER_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: {
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url
                }
            };
        //#endregion
        default:
            return state;
    }
}
