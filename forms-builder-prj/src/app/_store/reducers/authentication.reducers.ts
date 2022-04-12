import { createReducer, on } from '@ngrx/store';
import { User } from '../../_models/user';
import {
    loginAction,
    loginFailedAction,
    loginSuccessAction,
    signUpAction,
    signUpSuccessAction
} from '../actions/user.action';

export interface UserAuthenticationState {
    isAuthenticated: boolean;
    user: User | null;
    errorMessage: string | null;
};

export const initialState: UserAuthenticationState = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
};

const _authenticationReducer = createReducer(
    initialState,
    on(loginAction, (state) => ({
        ...state,
        isAuthenticated: false,
        user: null,
        errorMessage: null
    })),
    on(loginSuccessAction, (state, action) => ({
        ...state,
        isAuthenticated: true,
        user: action.user,
        errorMessage: null
    })),
    on(loginFailedAction, (state) => ({
        ...state,
        isAuthenticated: false,
        errorMessage: state.errorMessage
    })),
    on(signUpAction, (state) => ({
        ...state,
        isAuthenticated: false,
        user: null,
        errorMessage: null
    })),
    on(signUpSuccessAction, (state, action) => ({
        ...state,
        user: {
            token: action.token,
            userName: action.userName
        }
    }))
);

export function authenticationReducer(state: any, action: any) {
    return _authenticationReducer(state, action);
}
