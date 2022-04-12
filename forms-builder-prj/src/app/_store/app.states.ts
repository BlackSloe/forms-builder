import { authenticationReducer, UserAuthenticationState } from './reducers/authentication.reducers';

export const authenticationFeatureName = 'authentication';

export interface AppState {
  authState: UserAuthenticationState;
}

export const reducers = {
  authReducer: authenticationReducer
}
