import { NgModule } from "@angular/core";
import { DragDropListItemsModule } from "../drag-drop-list-items/drag-drop-list-items.module";
import { DragDropListItemComponent } from "./drag-drop-list-item.component";

@NgModule({
    declarations: [DragDropListItemComponent],
    imports: [DragDropListItemsModule],
    exports: [DragDropListItemComponent]
})
export class DragDropListItemModule { }