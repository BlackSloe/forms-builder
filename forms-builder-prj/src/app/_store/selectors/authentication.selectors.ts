import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, authenticationFeatureName } from '../app.states';
import { UserAuthenticationState } from '../reducers/authentication.reducers';

export const selectAuthState = createFeatureSelector<UserAuthenticationState>(authenticationFeatureName);

export const selectIsUserAuthenticated = createSelector(
    selectAuthState,
    (state: UserAuthenticationState) => state?.isAuthenticated
);