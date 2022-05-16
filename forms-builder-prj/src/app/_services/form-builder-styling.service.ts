import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { FormBuilderStylePropertyValidationRules } from '../_enums/form-builder-style-property-validation-rules';
import { FormBuilderFormStyles } from '../_models/form-builder-form-styles';
import { DraggableItemStyles } from '../_models/draggable/draggable-item-styles';
import { IFormBuilderStyles } from '../_shared/interfaces/form-builder-styles.interface';

@Injectable({ providedIn: 'root' })
export class FormBuilderStylingService {
    private currentFormBuilderFormStylesSubject: BehaviorSubject<FormBuilderFormStyles>;
    private _currentFormBuilderFormStyles$: Observable<FormBuilderFormStyles>;

    private currentDraggableItemStylesSubject: BehaviorSubject<DraggableItemStyles>;
    private _currentDraggableItemStyles$: Observable<DraggableItemStyles>;

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

    public isStylesValid(styles: IFormBuilderStyles): boolean {
        return this.validateStyles(styles);
    }

    public get errorMessages(): string[] {
        return this._errorMessages;
    }

    constructor() {
        this.currentFormBuilderFormStylesSubject = new BehaviorSubject<FormBuilderFormStyles>
            (new FormBuilderFormStyles());
        this._currentFormBuilderFormStyles$ = this.currentFormBuilderFormStylesSubject.asObservable();

        this.currentDraggableItemStylesSubject = new BehaviorSubject<DraggableItemStyles>
            (new DraggableItemStyles());
        this._currentDraggableItemStyles$ = this.currentDraggableItemStylesSubject.asObservable();
    }

    public get currentFormBuilderFormStyles$(): Observable<FormBuilderFormStyles> {
        return this._currentFormBuilderFormStyles$;
    }

    public get currentDraggableItemStyles$(): Observable<DraggableItemStyles> {
        return this._currentDraggableItemStyles$;
    }

    public setFormBuilderStyles(value: FormBuilderFormStyles): void {
        this.currentFormBuilderFormStylesSubject.next(value);
    }

    public setDraggableItemStyles(value: DraggableItemStyles): void {
        this.currentDraggableItemStylesSubject.next(value);
    }

    private validateStyles(formBuilderStyles: IFormBuilderStyles): boolean {
        let isValid = true;

        for (const style of formBuilderStyles.styles) {
            for (const validationRule of style.validationRules) {

                switch (validationRule) {
                    case FormBuilderStylePropertyValidationRules.IS_MEASURED_IN_PIXELS: {
                        if (!style.propValue.endsWith('px')) {
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
                        if (this.isNegative(style.propValue)) {
                            this._errorMessages.push(`${style.propName} should not be negative value`);
                            isValid = false;
                        }
                    } break;

                    default: break;
                }
            }
        }
        return isValid;
    }

    public clearErrorMessage(): void {
        this._errorMessages = [];
    }

    // private appendPixels(propValue: string): string {
    //     if (!propValue.endsWith('px')) {
    //         return propValue.concat('px');
    //     }
    //     return propValue;
    // }

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
