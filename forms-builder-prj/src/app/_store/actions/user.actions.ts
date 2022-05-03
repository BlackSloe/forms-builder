import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/_models/user';
import { AuthenticationActionTypes } from 'src/app/_enums/authentication.action.types';

export const loginAction = createAction(
    AuthenticationActionTypes.LOGIN,
    props<{ userName: string, password: string }>()
);

export const loginSuccessAction = createAction(
    AuthenticationActionTypes.LOGIN_SUCCESS,
    props<{ user: User }>()
);

export const loginFailedAction = createAction(
    AuthenticationActionTypes.LOGIN_FAILED,
    props<{ error: string }>()
);

export const signUpAction = createAction(
    AuthenticationActionTypes.SIGNUP,
    props<{ userName: string, password: string, token: string }>()
);

export const signUpSuccessAction = createAction(
    AuthenticationActionTypes.SIGNUP_SUCCESS,
    props<{ token: string, userName: string }>()
);

export const logoutAction = createAction(
    AuthenticationActionTypes.LOGOUT
);

export const loadUser = createAction(
    AuthenticationActionTypes.LOAD_USER
);
