import { createFeatureSelector, createSelector } from '@ngrx/store';

import { formBuilderFeatureName } from '../app.states';
import { FormBuilderStyleState } from '../reducers/form-builder.reducers';

export const selectFormBuilderState = createFeatureSelector<FormBuilderStyleState>(formBuilderFeatureName);

export const selectFormBuilderFormStyles = createSelector(
    selectFormBuilderState,
    (state: FormBuilderStyleState) => state.formGeneralStyles
);

export const selectDraggableItemStyles = createSelector(
    selectFormBuilderState,
    (state: FormBuilderStyleState) => state.draggableItemStyles
);
