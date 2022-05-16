import { authenticationReducer, UserAuthenticationState } from './reducers/authentication.reducers';
import { formBuilderReducer, FormBuilderStyleState } from './reducers/form-builder.reducers';

export const authenticationFeatureName = 'authentication';
export const formBuilderFeatureName = 'formBuilder';

export interface AppState {
  authState: UserAuthenticationState;
  formBuilderState: FormBuilderStyleState;
}

export const reducers = {
  authenticationReducer,
  formBuilderReducer
}
