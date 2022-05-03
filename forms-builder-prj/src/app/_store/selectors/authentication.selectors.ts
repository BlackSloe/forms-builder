import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authenticationFeatureName } from '../app.states';
import { UserAuthenticationState } from '../reducers/authentication.reducers';

export const selectAuthState = createFeatureSelector<UserAuthenticationState>(authenticationFeatureName);

export const selectIsUserAuthenticated = createSelector(
    selectAuthState,
    (state: UserAuthenticationState) => state.isAuthenticated
);

export const selectAuthenticatedUser = createSelector(
    selectAuthState,
    (state: UserAuthenticationState) => state?.user
);
