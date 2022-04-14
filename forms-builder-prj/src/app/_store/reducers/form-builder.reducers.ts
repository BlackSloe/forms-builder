import { createReducer, on } from '@ngrx/store';
import { FormBuilderStyle } from 'src/app/_models/form-builder-style';
import { loadDropSectionStylesAction } from '../actions/form-builder.actions';

export interface FormBuilderStyleState {
    styles: FormBuilderStyle;
};

export const initialState: FormBuilderStyleState = {
    styles: new FormBuilderStyle()
};

const _formBuilderReducer = createReducer(
    initialState,
    on(loadDropSectionStylesAction, (state) => ({
        ...state,
        styles: state.styles
    }))
);

export function formBuilderReducer(state: any, action: any) {
    return _formBuilderReducer(state, action);
}
