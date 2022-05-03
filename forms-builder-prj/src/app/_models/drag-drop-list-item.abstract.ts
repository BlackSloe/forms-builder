import { FormBuilderStylePropertyValidationRules as ValidationRules} from 'src/app/_enums/form-builder-style-property-validation-rules';
import { FormBuilderFormStyleProperty } from 'src/app/_models/form-builder-form-style-property';
import { IStyles } from '../_shared/interfaces/styles.interface';


export class DragDropListItem implements IStyles {
    styles: FormBuilderFormStyleProperty[] = [];
    // placeHolderText: FormBuilderFormStyleProperty = new FormBuilderFormStyleProperty();
    // height: FormBuilderFormStyleProperty = new FormBuilderFormStyleProperty();

    constructor() {
        // this.height = {
        //     propName: 'height',
        //     propValue: '',
        //     validationRules: [ValidationRules.IS_MEASURED_IN_PIXELS, ValidationRules.NOT_NEGATIVE]
        // };

        // this.placeHolderText = {
        //     propName: 'placeHolderText',
        //     propValue: '',
        //     validationRules: []
        // }

        this.styles = [
            {
                propName: 'minWidth',
                propValue: '',
                validationRules: [ValidationRules.IS_MEASURED_IN_PIXELS, ValidationRules.NOT_NEGATIVE]
            },
            // {
            //     propName: 'required',
            //     propValue: '',
            //     validationRules: [ValidationRules.IS_BOOLEAN]
            // },
            {
                propName: 'borderStyle',
                propValue: '',
                validationRules: [ValidationRules.IS_BORDER_STYLE_VALUE]
            },
            {
                propName: 'fontSize',
                propValue: '',
                validationRules: [ValidationRules.IS_MEASURED_IN_PIXELS, ValidationRules.NOT_NEGATIVE]
            },
            {
                propName: 'fontWeight',
                propValue: '',
                validationRules: [ValidationRules.NOT_NEGATIVE]
            }
        ]
    }
};
