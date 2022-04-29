import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authenticationFeatureName, formBuilderFeatureName } from '../app.states';
import { FormBuilderStyleState } from '../reducers/form-builder.reducers';

export const selectFormBuilderState = createFeatureSelector<FormBuilderStyleState>(formBuilderFeatureName);

export const selectFormBuilderFormStyles = createSelector(
    selectFormBuilderState,
    (state: FormBuilderStyleState) => state.formGeneralStyles
);

export const selectDragDropListItem = createSelector(
    selectFormBuilderState,
    (state: FormBuilderStyleState) => state!.listItemStyles
);
