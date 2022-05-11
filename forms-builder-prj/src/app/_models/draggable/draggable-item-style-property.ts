import { FormBuilderStylePropertyValidationRules } from 'src/app/_enums/form-builder-style-property-validation-rules';
import { FormBuilderStyleProperty } from '../form-builder-style-property';

export class DraggableItemStyleProperty implements FormBuilderStyleProperty {
    readonly propName: string;
    propValue: string;

    readonly inStyleArray: boolean;

    validationRules: FormBuilderStylePropertyValidationRules[];
};
