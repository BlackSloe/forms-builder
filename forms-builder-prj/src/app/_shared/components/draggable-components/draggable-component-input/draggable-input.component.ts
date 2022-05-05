import { Component } from '@angular/core';
import { DraggableItemStyles } from 'src/app/_models/draggable-item-styles';
import { DraggableItemComponent } from 'src/app/_shared/components/draggable-item.component';

@Component({
    selector: 'app-draggable-input',
    templateUrl: './draggable-input.component.html',
})
export class DraggableInputComponent extends DraggableItemComponent {
    // draggableItemStyles: DraggableItemStyles = new DraggableItemStyles();

    public get _styles(): any {
        // if (!this.draggableItemStyles.styles) {
        //     return {};
        // }

        // const styleObj = {} as any;

        // for (const style of this.draggableItemStyles.styles) {
        //     styleObj[style.propName] = style.propValue;
        // }
        // // console.log(styleObj);
        return {};
    }
};
