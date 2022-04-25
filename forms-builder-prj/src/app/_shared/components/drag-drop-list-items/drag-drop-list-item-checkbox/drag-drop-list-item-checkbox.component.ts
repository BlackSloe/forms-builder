import { Component } from "@angular/core";
import { DragDropListItem } from "src/app/_shared/abstract/drag-drop-list-item.abstract";
import { IDragDropListItemComponent } from "src/app/_shared/interfaces/drag-drop-list-item-component.interface";

@Component({
    selector: 'app-drag-drop-list-checkbox-input',
    templateUrl: './drag-drop-list-item-checkbox.component.html',
})
export class DragDropListItemCheckboxComponent implements IDragDropListItemComponent {
    dragDropListItem: DragDropListItem;
    
};