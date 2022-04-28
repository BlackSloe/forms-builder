import { createReducer, on } from '@ngrx/store';
import { FormBuilderFormStyle } from 'src/app/_models/form-builder-form-style';
import { DragDropListItem } from 'src/app/_shared/abstract/drag-drop-list-item.abstract';
import {
    loadDropSectionFormStylesAction,
    setDropSectionListItemStylesAction,
    setDropSectionStylesAction,
    setDropSectionStylesFailedAction,
    setDropSectionStylesSuccessAction
} from '../actions/form-builder.actions';

export interface FormBuilderStyleState {
    formGeneralStyles: FormBuilderFormStyle;
    listItemStyles: DragDropListItem;
    errorMessage: string | null;
};

export const initialState: FormBuilderStyleState = {
    formGeneralStyles: new FormBuilderFormStyle(),
    listItemStyles: new DragDropListItem(),
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
       formGeneralStyles: action.styleObj,
       errorMessage: null
    })),
    on(setDropSectionStylesFailedAction, (state) => ({
        ...state,
        errorMessage: state.errorMessage
    })),
    on(loadDropSectionFormStylesAction, (state) => ({ //add success and failed
        ...state,
        formGeneralStyles: state.formGeneralStyles
    })),
    on(setDropSectionListItemStylesAction, (state, action) => ({
        ...state,
        listItemStyles: action.dragDropListItem
    }))

);

export function formBuilderReducer(state: any, action: any) {
    return _formBuilderReducer(state, action);
}
