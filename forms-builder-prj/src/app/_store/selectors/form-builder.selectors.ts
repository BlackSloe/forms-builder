import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authenticationFeatureName, formBuilderFeatureName } from '../app.states';
import { FormBuilderStyleState } from '../reducers/form-builder.reducers';

export const selectFormBuilderState = createFeatureSelector<FormBuilderStyleState>(formBuilderFeatureName);

export const selectFormBuilderFormStyles = createSelector(
    selectFormBuilderState,
    (state: FormBuilderStyleState) => state.formGeneralStyles
);


// const styleObj = {} as any;

// for (const style of state.formGeneralStyles.styles) {
//     styleObj[style.propName] = style.propValue;
// }

// return styleObj;