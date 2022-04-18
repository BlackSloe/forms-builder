import { FormBuilderStylePropertyValidationRules } from '../_enums/form-builder-style-property-validation-rules';
import { FormBuilderStyleProperty } from './form-builder-style-property';

export class FormBuilderStyle {
    public styles: FormBuilderStyleProperty[] = [];

    constructor() {
        this.styles = [
            {
                propName: 'minWidth', propValue: '',
                validationRules: [FormBuilderStylePropertyValidationRules.IS_MEASURED_IN_PIXELS, FormBuilderStylePropertyValidationRules.NOT_NEGATIVE]
            },
            {
                propName: 'height', propValue: '',
                validationRules: [FormBuilderStylePropertyValidationRules.IS_MEASURED_IN_PIXELS, FormBuilderStylePropertyValidationRules.NOT_NEGATIVE]
            },
            {
                propName: 'borderWidth', propValue: '',
                validationRules: [FormBuilderStylePropertyValidationRules.IS_MEASURED_IN_PIXELS, FormBuilderStylePropertyValidationRules.NOT_NEGATIVE]
            },
            {
                propName: 'borderStyle', propValue: '',
                validationRules: [FormBuilderStylePropertyValidationRules.IS_BORDER_STYLE_VALUE]
            },
            {
                propName: 'borderColor', propValue: '',
                validationRules: [FormBuilderStylePropertyValidationRules.IS_COLOR_VALUE]
            }
        ];
    }
}
