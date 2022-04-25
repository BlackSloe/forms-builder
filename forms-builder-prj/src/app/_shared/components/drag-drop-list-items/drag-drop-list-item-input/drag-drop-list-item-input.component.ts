import { Component } from "@angular/core";
import { DragDropListItem } from "src/app/_shared/abstract/drag-drop-list-item.abstract";
import { IDragDropListItemComponent } from "src/app/_shared/interfaces/drag-drop-list-item-component.interface";

@Component({
    selector: 'app-drag-drop-list-item-input',
    templateUrl: './drag-drop-list-item-input.component.html',
})
export class DragDropListItemInputComponent implements IDragDropListItemComponent {
    dragDropListItem: DragDropListItem;

};