import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { DraggableItemStyles } from 'src/app/_models/draggable/draggable-item-styles';
import { FormBuilderFormStyles } from 'src/app/_models/form-builder-form-styles';
import { reducers } from '../app.states';
import {
    clearDraggableItemStylesAction,
    loadFormBuilderFormStylesAction,
    setDraggableItemStylesAction,
    setFormBuilderStylesAction,
    setFormBuilderStylesFailedAction,
    setFormBuilderStylesSuccessAction,
    setSelectedDraggableItemStylesAction
} from '../actions/form-builder.actions';

describe('form-builder reducers', () => {
    let storeMock: MockStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                provideMockStore({})
            ]
        })
        .compileComponents();

        storeMock = TestBed.inject(MockStore);
    });

    describe('formBuilderReducer', () => {
        it('should setDropSectionStyles action', () => {
            const mockFormGeneralStyles = new FormBuilderFormStyles();
            const initialState: any = {};

            const createAction = setFormBuilderStylesAction({ styles: mockFormGeneralStyles });

            const actualState = reducers.formBuilderReducer(initialState, createAction);

            expect(actualState.errorMessage).toEqual(null);
        });

        it('should setDropSectionStylesSuccess action', () => {
            const mockFormGeneralStyles = new FormBuilderFormStyles();

            mockFormGeneralStyles.styles.forEach((style) => {
                style.propValue = '123';
            });

            const expectedState = {
                formGeneralStyles: mockFormGeneralStyles,
                errorMessage: null,
            };

            const initialState: any = {};

            const createAction = setFormBuilderStylesSuccessAction({ styles: mockFormGeneralStyles });

            const actualState = reducers.formBuilderReducer(initialState, createAction);

            expect(actualState.formGeneralStyles).toEqual(expectedState.formGeneralStyles);
            expect(actualState.errorMessage).toEqual(expectedState.errorMessage);
        });

        it('should setDropSectionStylesFailed action', () => {
            const errorMessage = 'asus x556 uq';

            const expectedState = {
                errorMessage
            };

            const initialState: any = {};

            const createAction = setFormBuilderStylesFailedAction({ errorMessage });

            const actualState = reducers.formBuilderReducer(initialState, createAction);

            expect(actualState.errorMessage).toEqual(expectedState.errorMessage);
        });

        it('should loadDropSectionFormStyles action', () => {
            const expectedState = {
                formGeneralStyles: undefined
            };

            const initialState: any = {};

            const createAction = loadFormBuilderFormStylesAction();

            const actualState = reducers.formBuilderReducer(initialState, createAction);

            expect(actualState.formGeneralStyles).toEqual(expectedState.formGeneralStyles);
        });

        it('should setDraggableItemStyles action', () => {
            const mockListItemStyles = new DraggableItemStyles();

            mockListItemStyles.styles.forEach((style) => {
                style.propValue = 'Hello'
            });

            const expectedState = {
                listItemStyles: mockListItemStyles
            };

            const initialState: any = {};

            const createAction = setDraggableItemStylesAction({ styles: mockListItemStyles });

            const actualState = reducers.formBuilderReducer(initialState, createAction);

            expect(actualState.draggableItemStyles).toEqual(expectedState.listItemStyles);
        });

        it('should setSelectedDraggableItemStyles action', () => {
            const mockListItemStyles = new DraggableItemStyles();

            mockListItemStyles.styles.forEach((style) => {
                style.propValue = 'Hello'
            });

            const expectedState = {
                listItemStyles: mockListItemStyles
            };

            const initialState: any = {};

            const createAction = setSelectedDraggableItemStylesAction({ styles: mockListItemStyles });

            const actualState = reducers.formBuilderReducer(initialState, createAction);

            expect(actualState.draggableItemStyles).toEqual(expectedState.listItemStyles);
        });

        it('should clearDraggableItemStylesAction action', () => {
            const mockListItemStyles = new DraggableItemStyles();

            const expectedState = {
                listItemStyles: null
            };

            const initialState: any = {};

            storeMock.dispatch(setDraggableItemStylesAction({ styles: mockListItemStyles }));

            const createAction = clearDraggableItemStylesAction();

            const actualState = reducers.formBuilderReducer(initialState, createAction);

            expect(actualState.draggableItemStyles).toEqual(expectedState.listItemStyles);
        });
    });
});
