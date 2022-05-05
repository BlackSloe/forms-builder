import { FormBuilderStylePropertyValidationRules } from '../_enums/form-builder-style-property-validation-rules';
import { FormBuilderFormStyleProperty } from './form-builder-form-style-property';

export class DraggableItemStyleProperty implements FormBuilderFormStyleProperty {
    propName: string;
    propValue: string;

    inStyleArray: boolean;

    validationRules: FormBuilderStylePropertyValidationRules[];
};
