import { SeparatorPipe } from './input-field-separator.pipe';

describe('SeparatorPipe', () => {
    const pipe = new SeparatorPipe();

    it('should separate helloManWhatsUp in camel case', () => {
        expect(pipe.transform('helloManWhatsUp')).toBe('hello Man Whats Up');
    });

    it('should separate whatHaveYouDone in camel case', () => {
        expect(pipe.transform('whatHaveYouDone')).toBe('what Have You Done');
    });
});