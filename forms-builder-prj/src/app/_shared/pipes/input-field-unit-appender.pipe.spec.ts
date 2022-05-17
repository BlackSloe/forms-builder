import { UnitAppenderPipe } from './input-field-unit-appender.pipe';
import {
    FormBuilderStylePropertyValidationRules as ValidationRules
} from 'src/app/_enums/form-builder-style-property-validation-rules';

describe('UnitAppenderPipe', () => {
    const pipe = new UnitAppenderPipe();

    it('should append [, px] if measure unit is pixel', () => {
        expect(pipe.transform('pixel', [ValidationRules.IS_MEASURED_IN_PIXELS])).toBe('pixel, px');
    });

    it('should append [, hex/rgb/keyword] if measure unit is color value', () => {
        expect(pipe.transform('color', [ValidationRules.IS_COLOR_VALUE])).toBe('color, hex/rgb/keyword');
    });

    it('should append [, keyword] if measure unit is keyword', () => {
        expect(pipe.transform('keyword', [ValidationRules.IS_BOOLEAN])).toBe('keyword, keyword');
    });

    it('should return value if validation rules array is empty', () => {
        expect(pipe.transform('123Hello', [])).toBe('123Hello');
    });
});
