import { FormBuilderStylePropertyValidationRules } from '../_enums/form-builder-style-property-validation-rules';

export class FormBuilderStyleProperty {
    propName: string;
    propValue: string;
    validationRules: FormBuilderStylePropertyValidationRules[];
}
