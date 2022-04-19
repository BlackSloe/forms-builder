import { createAction, props } from '@ngrx/store';
import { FormBuilderStyle } from 'src/app/_models/form-builder-style';
import { FormBuilderActionTypes } from 'src/app/_enums/form-builder.action.types';


export const setDropSectionStylesAction = createAction(
    FormBuilderActionTypes.SET_FORM_BUILDER_STYLES,
    props<{ styleObj: FormBuilderStyle }>()
);

export const setDropSectionStylesSuccessAction = createAction(
    FormBuilderActionTypes.SET_FORM_BUILDER_SUCCESS_STYLES,
    props<{ styleObj: FormBuilderStyle }>()
);

export const setDropSectionStylesFailedAction = createAction(
    FormBuilderActionTypes.SET_FORM_BUILDER_FALIED_STYLES,
    props<{ errorMessage: string }>()
);

export const loadDropSectionStylesAction = createAction(
    FormBuilderActionTypes.LOAD_FORM_BUILDER_STYLES,
    props<{ styleObj: {} }>()
);
