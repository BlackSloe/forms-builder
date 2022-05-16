import { createReducer, on } from '@ngrx/store';

import { User } from '../../_models/user';
import {
    loadUser,
    loadUserFailed,
    loadUserSuccessfully,
    loginAction,
    loginFailedAction,
    loginSuccessAction,
    logoutAction,
    signUpAction,
    signUpSuccessAction
} from '../actions/user.actions';

export interface UserAuthenticationState {
    isAuthenticated: boolean;
    user: User;
    errorMessage: string | null;
};

export const initialState: UserAuthenticationState = {
    isAuthenticated: false,
    user: new User(),
    errorMessage: null
};

const _authenticationReducer = createReducer(
    initialState,
    on(loginAction, (state) => ({
        ...state,
        isAuthenticated: false,
        user: new User(),
        errorMessage: null
    })),
    on(loginSuccessAction, (state, action) => ({
        ...state,
        isAuthenticated: true,
        user: action.user,
        errorMessage: null
    })),
    on(loginFailedAction, (state, action) => ({
        ...state,
        isAuthenticated: false,
        errorMessage: action.errorMessage
    })),
    on(signUpAction, (state) => ({
        ...state,
        isAuthenticated: false,
        user: new User(),
        errorMessage: null
    })),
    on(signUpSuccessAction, (state, action) => ({
        ...state,
        user: {
            token: action.token,
            userName: action.userName
        }
    })),
    on(logoutAction, (state) => ({
        ...state,
        user: new User(),
        isAuthenticated: false
    })),
    on(loadUser, (state) => ({
        ...state,
        user: state.user
    })),
    on(loadUserSuccessfully, (state, action) => ({
        ...state,
        user: action.user,
        isAuthenticated: true
    })),
    on(loadUserFailed, (state, action) => ({
        ...state,
        errorMessage: action.errorMessage
    }))
);

export function authenticationReducer(state: any, action: any) {
    return _authenticationReducer(state, action);
}
