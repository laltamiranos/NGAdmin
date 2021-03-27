import * as fromLogin from '../actions/login.actions';

import { Usuario } from 'src/app/shared/models/usuario.model';

export interface LoginState {
    user: Usuario;
    loaded: boolean;
    loading: boolean;
    error: any;
};

const initState: LoginState = {
    user: null,
    loaded: false,
    loading: false,
    error: null
};

export function loginReducer(state = initState, action: fromLogin.loginActions): LoginState {
    switch (action.type) {
        case fromLogin.GET_LOGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case fromLogin.GET_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                user: {...action.user}
            };
        case fromLogin.GET_LOGIN_FAIL:
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
