import {
    FormBuilderStylePropertyValidationRules as ValidationRules
} from '../_enums/form-builder-style-property-validation-rules';
import { IStyles } from '../_shared/interfaces/styles.interface';
import { FormBuilderFormStyleProperty } from './form-builder-form-style-property';

export class FormBuilderFormStyle implements IStyles {
    public styles: FormBuilderFormStyleProperty[] = [];

    constructor() {
        this.styles = [
            {
                propName: 'minWidth', propValue: '',
                validationRules: [ValidationRules.IS_MEASURED_IN_PIXELS, ValidationRules.NOT_NEGATIVE]
            },
            {
                propName: 'height', propValue: '',
                validationRules: [ValidationRules.IS_MEASURED_IN_PIXELS, ValidationRules.NOT_NEGATIVE]
            },
            {
                propName: 'borderWidth', propValue: '',
                validationRules: [ValidationRules.IS_MEASURED_IN_PIXELS, ValidationRules.NOT_NEGATIVE]
            },
            {
                propName: 'borderStyle', propValue: '',
                validationRules: [ValidationRules.IS_BORDER_STYLE_VALUE]
            },
            {
                propName: 'borderColor', propValue: '',
                validationRules: [ValidationRules.IS_COLOR_VALUE]
            }
        ];
    }
}
