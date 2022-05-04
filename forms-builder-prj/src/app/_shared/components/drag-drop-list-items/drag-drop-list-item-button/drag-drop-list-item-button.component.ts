import { Component } from '@angular/core';
import { DraggableItemStyles } from 'src/app/_models/draggable-item-styles';
import { DraggableItemComponent } from 'src/app/_shared/components/draggable-item.component';

@Component({
    selector: 'app-drag-drop-list-button-input',
    templateUrl: './drag-drop-list-item-button.component.html',
})
export class DragDropListItemButtonComponent implements DraggableItemComponent {
    draggableItemStyles: DraggableItemStyles = new DraggableItemStyles();

    public get _styles(): any {
        if (!this.draggableItemStyles.styles) {
            return {};
        }

        const styleObj = {} as any;

        for (const style of this.draggableItemStyles.styles) {
            styleObj[style.propName] = style.propValue;
        }
        // console.log(styleObj);
        return styleObj;
    }
};
