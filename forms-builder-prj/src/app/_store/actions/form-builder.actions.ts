import { createAction, props } from '@ngrx/store';
import { FormBuilderStyle } from 'src/app/_models/form-builder-style';

export enum AuthenticationActionTypes {
    LOAD_FORM_BUILDER_STYLES = '[Form-Builder] Load Styles'
}

export const loadDropSectionStylesAction = createAction(
    AuthenticationActionTypes.LOAD_FORM_BUILDER_STYLES,
    props<{ styleObj: FormBuilderStyle }>()
);