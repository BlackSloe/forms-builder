import { Component } from '@angular/core';
import { DraggableItemComponent } from 'src/app/_shared/components/draggable-item.component';

@Component({
    selector: 'app-draggable-checkbox',
    templateUrl: './draggable-checkbox.component.html',
})
export class DraggableCheckboxComponent extends DraggableItemComponent {
    constructor() {
        super();
    }

    public get styles(): any {
        return this.getStylesAsKeyValue(this.draggableItemStyles);
    }

    public get placeHolderText(): string {
        return super.getPlaceHolderText(this.draggableItemStyles); 
    }
};
