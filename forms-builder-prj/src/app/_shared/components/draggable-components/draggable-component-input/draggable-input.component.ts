import { Component } from '@angular/core';
import { DraggableItemComponent } from 'src/app/_shared/components/draggable-item.component';

@Component({
    selector: 'app-draggable-input',
    templateUrl: './draggable-input.component.html',
})
export class DraggableInputComponent extends DraggableItemComponent {
    constructor() {
        super();
    }

    public get styles(): any {
        return this.getStylesAsKeyValue(this.draggableItemStyles);
    }
};
