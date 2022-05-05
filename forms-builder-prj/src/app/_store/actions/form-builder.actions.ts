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

export const setSelectedDraggableItemStylesAction = createAction(
    FormBuilderActionTypes.SET_SELECTED_DRAGGABLE_ITEM_STYLES,
    props<{ styles: DraggableItemStyles }>()
);

export const setSelectedDraggableItemStylesSuccessAction = createAction(
    FormBuilderActionTypes.SET_SELECTED_DRAGGABLE_ITEM_STYLES_SUCCESS,
    props<{ styles: DraggableItemStyles }>()
);

export const setSelectedDraggableItemStylesFailedAction = createAction(
    FormBuilderActionTypes.SET_SELECTED_DRAGGABLE_ITEM_STYLES_FALIED,
    props<{ errorMessage: string }>()
);

export const setDraggableItemStylesAction = createAction(
    FormBuilderActionTypes.SET_DRAGGABLE_ITEM_STYLES,
    props<{ styles: DraggableItemStyles }>()
);

export const loadDraggableItemStylesAction = createAction(
    FormBuilderActionTypes.LOAD_DRAGGABLE_ITEM_STYLES
);

export const clearDraggableItemStylesAction = createAction(
    FormBuilderActionTypes.CLEAR_DRAGGABLE_ITEM_STYLES
);
