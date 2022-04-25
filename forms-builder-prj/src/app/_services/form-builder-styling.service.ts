import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilderStylePropertyValidationRules } from '../_enums/form-builder-style-property-validation-rules';
import { FormBuilderFormStyle } from '../_models/form-builder-form-style';

@Injectable({ providedIn: 'root' })
export class FormBuilderStylingService {
    private currentFormBuilderFormStylesSubject: BehaviorSubject<FormBuilderFormStyle>;
    private _currentFormBuilderFormStyles$: Observable<FormBuilderFormStyle>;

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
        this.currentFormBuilderFormStylesSubject = new BehaviorSubject<FormBuilderFormStyle>(new FormBuilderFormStyle());
        this._currentFormBuilderFormStyles$ = this.currentFormBuilderFormStylesSubject.asObservable();
    }

    public get currentFormBuilderFormStyles$(): Observable<FormBuilderFormStyle> {
        return this._currentFormBuilderFormStyles$;
    }

    public newStyle(value: FormBuilderFormStyle): void {
        this.currentFormBuilderFormStylesSubject.next(value);
    }

    public validateStyles(): void {
        const FormBuilderFormStyles: FormBuilderFormStyle =
            JSON.parse(JSON.stringify(this.currentFormBuilderFormStylesSubject.value));

        for (const style of FormBuilderFormStyles.styles) {
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
        console.log(FormBuilderFormStyles);
        this.currentFormBuilderFormStylesSubject.next(FormBuilderFormStyles);
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
