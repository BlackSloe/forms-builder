import { TestBed } from '@angular/core/testing';
import {
    FormBuilderStylePropertyValidationRules as ValidationRules
} from '../_enums/form-builder-style-property-validation-rules';
import { DraggableItemStyles } from '../_models/draggable/draggable-item-styles';
import { FormBuilderFormStyles } from '../_models/form-builder-form-styles';
import { FormBuilderStylingService } from './form-builder-styling.service';

describe('FormBuilderStylingService', () => {
    let formBuilderStyilingService: FormBuilderStylingService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [FormBuilderStylingService]
        });

        formBuilderStyilingService = TestBed.inject(FormBuilderStylingService);
    });

    describe('errorMessages', () => {
        it('should return errorMessages', () => {
            const errorMessages = ['Hello', 'Halo'];

            formBuilderStyilingService['_errorMessages'] = errorMessages;

            expect(formBuilderStyilingService.errorMessages).toBe(errorMessages);
        });
    });

    describe('validateStyles', () => {
        it('should be valid if prop is measured in pixels', () => {
            const formStyles = new FormBuilderFormStyles();
            formStyles.styles = [
                { propName: 'test1', propValue: '100px', validationRules: [ValidationRules.IS_MEASURED_IN_PIXELS] }
            ];

            const result = formBuilderStyilingService.isStylesValid(formStyles);

            expect(result).toBe(true);
        });

        it('should not be valid if prop is measured in pixels', () => {
            const formStyles = new FormBuilderFormStyles();
            const mockPropName = 'minions';
            const expectedErrorMessage = [`${mockPropName} is not digit`];

            formStyles.styles = [
                { propName: mockPropName, propValue: '100x', validationRules: [ValidationRules.IS_MEASURED_IN_PIXELS] }
            ];

            const result = formBuilderStyilingService.isStylesValid(formStyles);
            const errorMessages = formBuilderStyilingService.errorMessages;

            expect(result).toBe(false);
            expect(expectedErrorMessage).toEqual(errorMessages);
        });

        it('should be valid if prop is color value', () => {
            const formStyles = new FormBuilderFormStyles();
            formStyles.styles = [
                { propName: 'test1', propValue: 'red', validationRules: [ValidationRules.IS_COLOR_VALUE] }
            ];

            const result = formBuilderStyilingService.isStylesValid(formStyles);

            expect(result).toBe(true);
        });

        it('should not be valid if not color value', () => {
            const formStyles = new FormBuilderFormStyles();
            const mockPropName = 'minions';
            const expectedErrorMessage = [`${mockPropName} is not color value`];

            formStyles.styles = [
                { propName: mockPropName, propValue: '100x', validationRules: [ValidationRules.IS_COLOR_VALUE] }
            ];

            const result = formBuilderStyilingService.isStylesValid(formStyles);
            const errorMessages = formBuilderStyilingService.errorMessages;

            expect(result).toBe(false);
            expect(expectedErrorMessage).toEqual(errorMessages);
        });

        it('should be valid if prop value border style value', () => {
            const formStyles = new FormBuilderFormStyles();
            formStyles.styles = [
                { propName: 'test1', propValue: 'dotted', validationRules: [ValidationRules.IS_BORDER_STYLE_VALUE] }
            ];

            const result = formBuilderStyilingService.isStylesValid(formStyles);

            expect(result).toBe(true);
        });

        it('should not be valid if prop value is not border style', () => {
            const formStyles = new FormBuilderFormStyles();
            const mockPropName = 'minions';
            const expectedErrorMessage = [`${mockPropName} is not border style value`];

            formStyles.styles = [
                { propName: mockPropName, propValue: '100x', validationRules: [ValidationRules.IS_BORDER_STYLE_VALUE] }
            ];

            const result = formBuilderStyilingService.isStylesValid(formStyles);
            const errorMessages = formBuilderStyilingService.errorMessages;

            expect(result).toBe(false);
            expect(expectedErrorMessage).toEqual(errorMessages);
        });

        it('should be valid if prop value is negative', () => {
            const formStyles = new FormBuilderFormStyles();
            formStyles.styles = [
                { propName: 'test1', propValue: '10', validationRules: [ValidationRules.NOT_NEGATIVE] }
            ];

            const result = formBuilderStyilingService.isStylesValid(formStyles);

            expect(result).toBe(true);
        });

        it('should not be valid if prop value is not negative', () => {
            const formStyles = new FormBuilderFormStyles();
            const mockPropName = 'minions';
            const expectedErrorMessage = [`${mockPropName} should not be negative value`];

            formStyles.styles = [
                { propName: mockPropName, propValue: '-100', validationRules: [ValidationRules.NOT_NEGATIVE] }
            ];

            const result = formBuilderStyilingService.isStylesValid(formStyles);
            const errorMessages = formBuilderStyilingService.errorMessages;

            expect(result).toBe(false);
            expect(expectedErrorMessage).toEqual(errorMessages);
        });
    });

    describe('setFormBuilderStyles', () => {
        it('should set form builder styles', () => {
            const formStyles = new FormBuilderFormStyles();
            formStyles.styles = [
                { propName: 'test1', propValue: '100px', validationRules: [ValidationRules.IS_MEASURED_IN_PIXELS] },
                { propName: '123', propValue: '-100', validationRules: [ValidationRules.NOT_NEGATIVE] },
                { propName: '123123123', propValue: '100x', validationRules: [ValidationRules.IS_BORDER_STYLE_VALUE] }
            ];

            formBuilderStyilingService.setFormBuilderStyles(formStyles);

            formBuilderStyilingService.currentFormBuilderFormStyles$.subscribe(actualValue => {
                expect(actualValue).toEqual(formStyles);
            });
        });
    });

    describe('setDraggableItemStyles', () => {
        it('should set draggable item styles', () => {
            const draggableItemStyles = new DraggableItemStyles();
            draggableItemStyles.styles = [
                { propName: 'test1', propValue: '100px',
                    validationRules: [ValidationRules.IS_MEASURED_IN_PIXELS], inStyleArray: true },
                { propName: '123', propValue: '-100',
                    validationRules: [ValidationRules.NOT_NEGATIVE], inStyleArray: true },
                { propName: '123123123', propValue: '100x',
                    validationRules: [ValidationRules.IS_BORDER_STYLE_VALUE], inStyleArray: true }
            ];

            formBuilderStyilingService.setDraggableItemStyles(draggableItemStyles);

            formBuilderStyilingService.currentDraggableItemStyles$.subscribe(actualValue => {
                expect(actualValue).toEqual(draggableItemStyles);
            });
        });
    });

    describe('clearErrorMessage', () => {
        it('should clear error messages', () => {
            formBuilderStyilingService['_errorMessages'] = ['Heelo', '123123123'];
            formBuilderStyilingService.clearErrorMessage();

            expect(formBuilderStyilingService.errorMessages).toEqual([]);
        });
    });
});
