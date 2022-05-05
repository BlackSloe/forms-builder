import { Component } from '@angular/core';
import { DraggableItemComponent } from 'src/app/_shared/components/draggable-item.component';

@Component({
  selector: 'app-draggable-select',
  templateUrl: './draggable-select.component.html',
})
export class DraggableSelectComponent extends DraggableItemComponent {
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
