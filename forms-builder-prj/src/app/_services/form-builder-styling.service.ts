import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilderStylePropertyValidationRules } from '../_enums/form-builder-style-property-validation-rules';
import { FormBuilderFormStyle } from '../_models/form-builder-form-style';
import { DraggableItemStyles } from '../_models/draggable/draggable-item-styles';
import { IStyles } from '../_shared/interfaces/styles.interface';

@Injectable({ providedIn: 'root' })
export class FormBuilderStylingService {
    private currentFormBuilderFormStylesSubject: BehaviorSubject<FormBuilderFormStyle>;
    private _currentFormBuilderFormStyles$: Observable<FormBuilderFormStyle>;

    private currentDragDropListItemStylesSubject: BehaviorSubject<FormBuilderFormStyle>;
    private _currentDragDropListItemStyles$: Observable<FormBuilderFormStyle>;

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

    public isStylesValid(styles: IStyles): boolean {
        return this.validateStyles(styles);
    }

    public get errorMessages(): string[] {
        return this._errorMessages;
    }

    constructor() {
        this.currentFormBuilderFormStylesSubject = new BehaviorSubject<FormBuilderFormStyle>
            (new FormBuilderFormStyle());
        this._currentFormBuilderFormStyles$ = this.currentFormBuilderFormStylesSubject.asObservable();

        this.currentDragDropListItemStylesSubject = new BehaviorSubject<FormBuilderFormStyle>
            (new FormBuilderFormStyle());
        this._currentDragDropListItemStyles$ = this.currentDragDropListItemStylesSubject.asObservable();
    }

    public get currentFormBuilderFormStyles$(): Observable<FormBuilderFormStyle> {
        return this._currentFormBuilderFormStyles$;
    }

    public get currentDragDropListItemStyles$(): Observable<FormBuilderFormStyle> {
        return this._currentDragDropListItemStyles$;
    }

    public setFormBuilderStyles(value: FormBuilderFormStyle): void {
        this.currentFormBuilderFormStylesSubject.next(value);
    }

    public setDragDropListItemStyles(value: DraggableItemStyles): void {
        this.currentDragDropListItemStylesSubject.next(value);
    }

    private validateStyles(style: IStyles): boolean {
        let isValid = true;
        let testVal;

        if (style instanceof FormBuilderFormStyle) {
            testVal = JSON.parse(JSON.stringify(this.currentFormBuilderFormStylesSubject.value)) as FormBuilderFormStyle;
        }
        else {
            testVal = JSON.parse(JSON.stringify(this.currentDragDropListItemStylesSubject.value)) as DraggableItemStyles;
        }

        for (const style of testVal.styles) {
            for (const validationRule of style.validationRules) {

                switch (validationRule) {
                    case FormBuilderStylePropertyValidationRules.IS_MEASURED_IN_PIXELS: {
                        if (style?.propValue.endsWith('px')) {
                            break;
                        }

                        if (this.isDigit(style.propValue)) {
                            style.propValue = this.appendPixels(style.propValue);
                        } else {
                            this._errorMessages.push(`${style.propName} is not digit`);
                            isValid = false;
                        }
                    } break;

                    case FormBuilderStylePropertyValidationRules.IS_COLOR_VALUE: {
                        if (!this.isColorValue(style.propValue)) {
                            this._errorMessages.push(`${style.propName} is not color value`);
                            isValid = false;
                        }
                    } break;

                    case FormBuilderStylePropertyValidationRules.IS_BORDER_STYLE_VALUE: {
                        if (!this.isBorderStyleValue(style.propValue)) {
                            this._errorMessages.push(`${style.propName} is not border style value`);
                            isValid = false;
                        }
                    } break;

                    case FormBuilderStylePropertyValidationRules.NOT_NEGATIVE: {
                        if (this.isNegative(style?.propValue)) {
                            this._errorMessages.push(`${style.propName} should not be negative value`);
                            isValid = false;
                        }
                    } break;

                    default: break;
                }
            }
        }
        if (style instanceof FormBuilderFormStyle) {
            this.currentFormBuilderFormStylesSubject.next(testVal);
        }
        else {
            this.currentDragDropListItemStylesSubject.next(testVal);
        }

        return isValid;
    }

    public clearErrorMessage(): void {
        this._errorMessages = [];
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
