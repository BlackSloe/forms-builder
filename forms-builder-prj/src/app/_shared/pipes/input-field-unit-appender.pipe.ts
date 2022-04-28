import { Pipe, PipeTransform } from '@angular/core';
import { FormBuilderStylePropertyValidationRules as ValidationRules } from 'src/app/_enums/form-builder-style-property-validation-rules';

@Pipe({
    name: 'appendunit',
    pure: true
})
export class UnitAppenderPipe implements PipeTransform {
    transform(value: string, args: ValidationRules[]) {
        if (args.length === 0) {
            return value;
        }

        if (args.includes(ValidationRules.IS_MEASURED_IN_PIXELS)) {
            return value + ', px';
        }

        if (args.includes(ValidationRules.IS_COLOR_VALUE)) {
            return value + ', hex/rgb/keyword';
        }

        return value + ', keyword';
    }
};
