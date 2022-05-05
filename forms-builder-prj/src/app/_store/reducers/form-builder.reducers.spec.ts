import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DraggableItemStyles } from 'src/app/_models/draggable-item-styles';
import { FormBuilderFormStyle } from 'src/app/_models/form-builder-form-style';
import {
    clearDraggableItemStylesAction,
    loadDropSectionFormStylesAction,
    setDraggableItemStylesAction,
    setDropSectionStylesAction,
    setDropSectionStylesFailedAction,
    setDropSectionStylesSuccessAction
} from '../actions/form-builder.actions';
import { reducers } from '../app.states';

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
            const mockFormGeneralStyles = new FormBuilderFormStyle();
            const initialState: any = {};

            const createAction = setDropSectionStylesAction({ styles: mockFormGeneralStyles });

            const actualState = reducers.formBuilderReducer(initialState, createAction);

            expect(actualState.errorMessage).toEqual(null);
        });

        it('should setDropSectionStylesSuccess action', () => {
            const mockFormGeneralStyles = new FormBuilderFormStyle();

            mockFormGeneralStyles.styles.forEach((style) => {
                style.propValue = '123';
            });
            
            const expectedState = {
                formGeneralStyles: mockFormGeneralStyles,
                errorMessage: null,
            };

            const initialState: any = {};

            const createAction = setDropSectionStylesSuccessAction({ styles: mockFormGeneralStyles });

            const actualState = reducers.formBuilderReducer(initialState, createAction);

            expect(actualState.formGeneralStyles).toEqual(expectedState.formGeneralStyles);
            expect(actualState.errorMessage).toEqual(expectedState.errorMessage);
        });

        it('should setDropSectionStylesFailed action', () => {
            const errorMessage = 'asus x556 uq';

            const expectedState = {
                errorMessage: errorMessage
            };

            const initialState: any = {};

            const createAction = setDropSectionStylesFailedAction({ errorMessage: errorMessage });

            const actualState = reducers.formBuilderReducer(initialState, createAction);

            expect(actualState.errorMessage).toEqual(expectedState.errorMessage);
        });

        it('should loadDropSectionFormStyles action', () => {
            const expectedState = {
                formGeneralStyles: undefined
            };

            const initialState: any = {};

            const createAction = loadDropSectionFormStylesAction();

            const actualState = reducers.formBuilderReducer(initialState, createAction);

            expect(actualState.formGeneralStyles).toEqual(expectedState.formGeneralStyles);
        });

        it('should setDropSectionListItemStyles action', () => {
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

            expect(actualState.listItemStyles).toEqual(expectedState.listItemStyles);
        });

        it('should clearDropSectionListItemStyles action', () => {
            const mockListItemStyles = new DraggableItemStyles();
            
            const expectedState = {
                listItemStyles: null
            };

            const initialState: any = {};

            storeMock.dispatch(setDraggableItemStylesAction({ styles: mockListItemStyles }));

            const createAction = clearDraggableItemStylesAction();

            const actualState = reducers.formBuilderReducer(initialState, createAction);

            expect(actualState.listItemStyles).toEqual(expectedState.listItemStyles);
        });
    });
});