import { FormBuilderStylePropertyValidationRules } from '../_enums/form-builder-style-property-validation-rules';
import { StyleProperty } from './style-property';

export class FormBuilderStyleProperty implements StyleProperty {
    readonly propName: string;
    propValue: string;

    validationRules: FormBuilderStylePropertyValidationRules[];
}
