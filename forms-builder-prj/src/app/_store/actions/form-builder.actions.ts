import { createAction, props } from '@ngrx/store';
import { FormBuilderFormStyle } from 'src/app/_models/form-builder-form-style';
import { FormBuilderActionTypes } from 'src/app/_enums/form-builder.action.types';
import { DraggableItemStyles } from 'src/app/_models/draggable-item-styles';


export const setDropSectionStylesAction = createAction(
    FormBuilderActionTypes.SET_FORM_BUILDER_STYLES,
    props<{ styles: FormBuilderFormStyle }>()
);

export const setDropSectionStylesSuccessAction = createAction(
    FormBuilderActionTypes.SET_FORM_BUILDER_SUCCESS_STYLES,
    props<{ styles: FormBuilderFormStyle }>()
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
    props<{ styles: DraggableItemStyles }>()
);

export const setDropSectionListItemStylesSuccessAction = createAction(
    FormBuilderActionTypes.SET_FORM_BUILDER_LIST_ITEM_SUCCESS_STYLES,
    props<{ styles: DraggableItemStyles }>()
);

export const setDropSectionListItemStylesFailedAction = createAction(
    FormBuilderActionTypes.SET_FORM_BUILDER_LIST_ITEM_FALIED_STYLES,
    props<{ errorMessage: string }>()
)

export const loadDropSectionListItemStylesAction = createAction(
    FormBuilderActionTypes.LOAD_FORM_BUILDER_LIST_ITEM_STYLES
);

export const clearDropSectionListItemStylesAction = createAction(
    FormBuilderActionTypes.CLEAR_FORM_BUILDER_LIST_ITEM_STYLES
);
