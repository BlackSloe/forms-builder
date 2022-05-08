import { createReducer, on } from '@ngrx/store';
import { FormBuilderFormStyles } from 'src/app/_models/form-builder-form-styles';
import { DraggableItemStyles } from 'src/app/_models/draggable/draggable-item-styles';
import {
    clearDraggableItemStylesAction,
    loadDropSectionFormStylesAction,
    setDraggableItemStylesAction,
    setDropSectionStylesAction,
    setDropSectionStylesFailedAction,
    setDropSectionStylesSuccessAction,
    setSelectedDraggableItemStylesAction
} from '../actions/form-builder.actions';

export interface FormBuilderStyleState {
    formGeneralStyles: FormBuilderFormStyles;
    draggableItemStyles: DraggableItemStyles | null;
    errorMessage: string | null;
};

export const initialState: FormBuilderStyleState = {
    formGeneralStyles: new FormBuilderFormStyles(),
    draggableItemStyles: null,
    errorMessage: null
};

const _formBuilderReducer = createReducer(
    initialState,
    on(setDropSectionStylesAction, (state) => ({
        ...state,
        formGeneralStyles: state.formGeneralStyles,
        errorMessage: null
    })),
    on(setDropSectionStylesSuccessAction, (state, action) => ({
       ...state,
       formGeneralStyles: action.styles,
       errorMessage: null
    })),
    on(setDropSectionStylesFailedAction, (state, action) => ({
        ...state,
        errorMessage: action.errorMessage
    })),
    on(loadDropSectionFormStylesAction, (state) => ({ //add success and failed
        ...state,
        formGeneralStyles: state.formGeneralStyles
    })),
    on(setSelectedDraggableItemStylesAction, (state, action) => ({
        ...state,
        draggableItemStyles: action.styles
    })),
    on(setDraggableItemStylesAction, (state, action) => ({
        ...state,
        draggableItemStyles: action.styles
    })),
    on(clearDraggableItemStylesAction, (state) => ({
        ...state,
        draggableItemStyles: null
    }))
);

export function formBuilderReducer(state: any, action: any) {
    return _formBuilderReducer(state, action);
}
