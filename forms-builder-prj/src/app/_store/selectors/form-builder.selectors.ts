import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authenticationFeatureName, formBuilderFeatureName } from '../app.states';
import { FormBuilderStyleState } from '../reducers/form-builder.reducers';

export const selectFormBuilderState = createFeatureSelector<FormBuilderStyleState>(formBuilderFeatureName);

export const selectFormBuilderStyles = createSelector(
    selectFormBuilderState,
    (state: any) => {
        let styleObj = {} as any;
        // console.log(state);
        
        for(const style of state.formGeneralStyles.styles) {
            styleObj[style.propName] = style.propValue;
            // console.log(style.propValue);
        }
        // console.log(styleObj);
        return styleObj;
    }
);
