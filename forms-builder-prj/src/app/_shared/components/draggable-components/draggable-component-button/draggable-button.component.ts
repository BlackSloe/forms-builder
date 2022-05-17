import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DraggableItemStyles } from 'src/app/_models/draggable/draggable-item-styles';
import { DraggableItemComponent } from 'src/app/_shared/components/draggable-item.component';

@Component({
    selector: 'app-draggable-button',
    templateUrl: './draggable-button.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => { DraggableButtonComponent }),
            multi: true
        }
    ]
})
export class DraggableButtonComponent extends DraggableItemComponent implements ControlValueAccessor {
    public disabled: boolean;

    public onChange: (value: DraggableItemStyles) => void;
    public onTouched: (value: DraggableItemStyles) => void;

    constructor() {
        super();
    }

    writeValue(draggableItemStyles: DraggableItemStyles): void {
        this.draggableItemStyles = draggableItemStyles;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public get styles(): any {
        return this.getStylesAsKeyValue(this.draggableItemStyles);
    }
};
