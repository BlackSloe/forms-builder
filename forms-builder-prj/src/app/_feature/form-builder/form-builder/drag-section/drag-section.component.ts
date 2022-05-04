import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DraggableItemComponentType } from 'src/app/_models/draggable-item-component-type';
import { DragDropListItemButtonComponent } from 'src/app/_shared/components/drag-drop-list-items/drag-drop-list-item-button/drag-drop-list-item-button.component';
import { DragDropListItemCheckboxComponent } from 'src/app/_shared/components/drag-drop-list-items/drag-drop-list-item-checkbox/drag-drop-list-item-checkbox.component';
import { DragDropListItemInputComponent } from 'src/app/_shared/components/drag-drop-list-items/drag-drop-list-item-input/drag-drop-list-item-input.component';
import { DragDropListItemSelectComponent } from 'src/app/_shared/components/drag-drop-list-items/drag-drop-list-item-select/drag-drop-list-item-select.component';
import { DragDropListItemTextareaComponent } from 'src/app/_shared/components/drag-drop-list-items/drag-drop-list-item-textarea/drag-drop-list-item-textarea.component';

@Component({
  selector: 'app-drag-section',
  templateUrl: './drag-section.component.html',
  styleUrls: ['./drag-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragSectionComponent implements OnInit {
  public dragSectionItems: Array<DraggableItemComponentType>  = [
    { component: new DragDropListItemInputComponent(), type: DragDropListItemInputComponent },
    { component: new DragDropListItemTextareaComponent(), type: DragDropListItemTextareaComponent },
    { component: new DragDropListItemButtonComponent(), type: DragDropListItemButtonComponent },
    { component: new DragDropListItemCheckboxComponent(), type: DragDropListItemCheckboxComponent },
    { component: new DragDropListItemSelectComponent(), type: DragDropListItemSelectComponent }
  ];

  constructor() {
  }

  ngOnInit(): void {

  }

 
}
