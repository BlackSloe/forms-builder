import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilderStylePropertyValidationRules } from '../_enums/form-builder-style-property-validation-rules';
import { FormBuilderStyle } from '../_models/form-builder-style';

@Injectable({ providedIn: 'root' })
export class FormBuilderStylingService {
    private currentFormBuilderStylesSubject: BehaviorSubject<FormBuilderStyle>;
    private _currentFormBuilderStyles$: Observable<FormBuilderStyle>;

    private _isValid = true;
    private _errorMessages: string[] = [];

    private readonly borderStyles = [
        'dotted',
        'dashed',
        'solid',
        'double',
        'groove',
        'ridge',
        'inset',
        'outset',
        'none',
        'hidden'
    ];

    public get isStylesValid(): boolean {
        return this._isValid;
    }

    public get errorMessages(): string[] {
        return this._errorMessages;
    }

    constructor() {
        this.currentFormBuilderStylesSubject = new BehaviorSubject<FormBuilderStyle>(new FormBuilderStyle());
        this._currentFormBuilderStyles$ = this.currentFormBuilderStylesSubject.asObservable();
    }

    public get currentFormBuilderStyles$(): Observable<FormBuilderStyle> {
        return this._currentFormBuilderStyles$;
    }

    public newStyle(value: FormBuilderStyle): void {
        this.currentFormBuilderStylesSubject.next(value);
    }

    public validateStyles(): void {
        const formBuilderStyles: FormBuilderStyle =
            JSON.parse(JSON.stringify(this.currentFormBuilderStylesSubject.value));

        for (const style of formBuilderStyles.styles) {
            for (const validationRule of style.validationRules) {

                switch (validationRule) {
                    case FormBuilderStylePropertyValidationRules.IS_MEASURED_IN_PIXELS: {
                        if (this.isDigit(style.propValue)) {
                            style.propValue = this.appendPixels(style.propValue);
                        } else {
                            this._errorMessages.push(`${style.propName} is not digit`);
                            this._isValid = false;
                        }
                    } break;

                    case FormBuilderStylePropertyValidationRules.IS_COLOR_VALUE: {
                        if (!this.isColorValue(style.propValue)) {
                            this._errorMessages.push(`${style.propName} is not color value`);
                            this._isValid = false;
                        }
                    } break;

                    case FormBuilderStylePropertyValidationRules.IS_BORDER_STYLE_VALUE: {
                        if (!this.isBorderStyleValue(style.propValue)) {
                            this._errorMessages.push(`${style.propName} is not border style value`);
                            this._isValid = false;
                        }
                    } break;

                    case FormBuilderStylePropertyValidationRules.NOT_NEGATIVE: {
                        if (this.isNegative(style?.propValue)) {
                            this._errorMessages.push(`${style.propName} should not be negative value`);
                            this._isValid = false;
                        }
                    } break;

                    default: break;
                }
            }
        }
        console.log(formBuilderStyles);
        this.currentFormBuilderStylesSubject.next(formBuilderStyles);
        // console.log(this._errorMessages);
    }

    private appendPixels(propValue: string): string {
        if (!propValue.endsWith('px')) {
            return propValue.concat('px');
        }
        return propValue;
    }

    private isDigit(propValue: string): boolean {
        return /^\d+$/.test(propValue);
    }

    private isNegative(propValue: string): boolean {
        return propValue.startsWith('-');
    }

    private isBorderStyleValue(propValue: string): boolean {
        return this.borderStyles.includes(propValue);
    }

    private isColorValue(propValue: string): boolean {
        return CSS.supports('color', propValue);
    }
}
