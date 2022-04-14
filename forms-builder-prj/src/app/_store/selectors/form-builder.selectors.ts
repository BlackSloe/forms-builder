import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authenticationFeatureName, formBuilderFeatureName } from '../app.states';
import { FormBuilderStyleState } from '../reducers/form-builder.reducers';

export const selectFormBuilderState = createFeatureSelector<FormBuilderStyleState>(authenticationFeatureName);

export const selectFormBuilderStyles = createSelector(
    selectFormBuilderState,
    (state: FormBuilderStyleState) => state.styles
);
