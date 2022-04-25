import { createAction, props } from '@ngrx/store';
import { FormBuilderFormStyle } from 'src/app/_models/form-builder-form-style';
import { FormBuilderActionTypes } from 'src/app/_enums/form-builder.action.types';


export const setDropSectionStylesAction = createAction(
    FormBuilderActionTypes.SET_FORM_BUILDER_STYLES,
    props<{ styleObj: FormBuilderFormStyle }>()
);

export const setDropSectionStylesSuccessAction = createAction(
    FormBuilderActionTypes.SET_FORM_BUILDER_SUCCESS_STYLES,
    props<{ styleObj: FormBuilderFormStyle }>()
);

export const setDropSectionStylesFailedAction = createAction(
    FormBuilderActionTypes.SET_FORM_BUILDER_FALIED_STYLES,
    props<{ errorMessage: string }>()
);

export const loadDropSectionFormStylesAction = createAction(
    FormBuilderActionTypes.LOAD_FORM_BUILDER_FORM_STYLES
);

export const setDropSectionListItemStylesAction = createAction(
    FormBuilderActionTypes.SET_FORM_BUILDER_LIST_ITEM_STYLES,
    props<{ obj : any }>()
);
export const loadDropSectionListItemStylesAction = createAction(
    FormBuilderActionTypes.LOAD_FORM_BUILDER_LIST_ITEM_STYLES,
    props<{ obj: any }>()
);
