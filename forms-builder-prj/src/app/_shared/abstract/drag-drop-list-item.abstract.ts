import { Output } from "@angular/core";
import { DragDropListItemStyle } from "src/app/_models/drag-drop-list-item-style";

export abstract class DragDropListItem {
    styles: DragDropListItemStyle[];
    placeHolderText: string;
    height: DragDropListItemStyle;
};
