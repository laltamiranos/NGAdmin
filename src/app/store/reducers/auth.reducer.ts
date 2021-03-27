import * as fromAuth from '../actions/auth.actions';

import { Usuario } from 'src/app/shared/models/usuario.model';

export interface AuthState {
    user: Usuario;
    loaded: boolean;
    loading: boolean;
    error: any;
};

const initState: AuthState = {
    user: null,
    loaded: false,
    loading: false,
    error: null
};

export function authReducer(state = initState, action: fromAuth.authAcciones): AuthState {
    switch (action.type) {
        case fromAuth.SET_USER:
            return {
                ...state,
                loading: true,
                error: null
            };
        case fromAuth.SET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                user: {...action.user}
            };
        case fromAuth.SET_USER_FAIL:
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
        default:
            return state;
    }
}
