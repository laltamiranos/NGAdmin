import { ActionReducerMap } from '@ngrx/store';

import * as fromLogin from './reducers/login.reducer';
import * as fromAuth from './reducers/auth.reducer';
import * as fromUsers from './reducers/users.reducer';
import * as fromTabs from './reducers/tabs.reducers';

export interface AppState {
    login: fromLogin.LoginState;
    auth: fromAuth.AuthState;
    users: fromUsers.UsersState;
    tabs: fromTabs.TabsState;
};

export const appReducers: ActionReducerMap<AppState> = {
    login: fromLogin.loginReducer,
    auth: fromAuth.authReducer,
    users: fromUsers.usersReducer,
    tabs: fromTabs.tabsReducer,
};