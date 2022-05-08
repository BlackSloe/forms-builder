import { FormBuilderStylePropertyValidationRules } from '../_enums/form-builder-style-property-validation-rules';
import { StyleProperty } from './style-property';

export class FormBuilderStyleProperty implements StyleProperty {
    propName: string;
    propValue: string;

    validationRules: FormBuilderStylePropertyValidationRules[];
}
