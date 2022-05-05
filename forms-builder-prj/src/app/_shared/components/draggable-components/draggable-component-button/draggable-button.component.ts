import { Component } from '@angular/core';
import { DraggableItemComponent } from 'src/app/_shared/components/draggable-item.component';

@Component({
    selector: 'app-draggable-button',
    templateUrl: './draggable-button.component.html',
})
export class DraggableButtonComponent extends DraggableItemComponent {
    constructor() {
        super();
    }

    public get styles(): any {
        return super.getStylesAsKeyValue(this.draggableItemStyles);
    }

    public get placeHolderText(): string {
        return super.getPlaceHolderText(this.draggableItemStyles); 
    }
};
