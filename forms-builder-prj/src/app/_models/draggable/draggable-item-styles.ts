import { FormBuilderStylePropertyValidationRules as ValidationRules} from 'src/app/_enums/form-builder-style-property-validation-rules';

import { IFormBuilderStyles } from 'src/app/_shared/interfaces/form-builder-styles.interface';
import { DraggableItemStyleProperty } from './draggable-item-style-property';


export class DraggableItemStyles implements IFormBuilderStyles {
    styles: DraggableItemStyleProperty[] = [];

    constructor() {
        this.styles = [
            {
                propName: 'minWidth',
                propValue: '',
                validationRules: [ValidationRules.IS_MEASURED_IN_PIXELS, ValidationRules.NOT_NEGATIVE],
                inStyleArray: true
            },
            {
                propName: 'borderStyle',
                propValue: '',
                validationRules: [ValidationRules.IS_BORDER_STYLE_VALUE],
                inStyleArray: true
            },
            {
                propName: 'fontSize',
                propValue: '',
                validationRules: [ValidationRules.IS_MEASURED_IN_PIXELS, ValidationRules.NOT_NEGATIVE],
                inStyleArray: true
            },
            {
                propName: 'fontWeight',
                propValue: '',
                validationRules: [ValidationRules.NOT_NEGATIVE],
                inStyleArray: true
            },
            {
                propName: 'placeHolderText',
                propValue: 'Default Text',
                validationRules: [],
                inStyleArray: false
            },
            {
                propName: 'height',
                propValue: '',
                validationRules: [ValidationRules.IS_MEASURED_IN_PIXELS, ValidationRules.IS_MEASURED_IN_PIXELS],
                inStyleArray: false
            }
        ]
    }
};
