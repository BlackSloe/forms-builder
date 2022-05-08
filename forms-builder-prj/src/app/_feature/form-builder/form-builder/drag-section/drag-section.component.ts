import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DraggableItemComponentType } from 'src/app/_models/draggable/draggable-item-component-type';
import { DraggableButtonComponent } from 'src/app/_shared/components/draggable-components/draggable-component-button/draggable-button.component';
import { DraggableCheckboxComponent } from 'src/app/_shared/components/draggable-components/draggable-component-checkbox/draggable-checkbox.component';
import { DraggableInputComponent } from 'src/app/_shared/components/draggable-components/draggable-component-input/draggable-input.component';
import { DraggableSelectComponent } from 'src/app/_shared/components/draggable-components/draggable-component-select/draggable-select.component';
import { DraggableTextareaComponent } from 'src/app/_shared/components/draggable-components/draggable-component-textarea/draggable-textarea.component';

@Component({
  selector: 'app-drag-section',
  templateUrl: './drag-section.component.html',
  styleUrls: ['./drag-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragSectionComponent implements OnInit {
  public draggableItems: DraggableItemComponentType[]  = [
    { component: new DraggableInputComponent(), type: DraggableInputComponent },
    { component: new DraggableTextareaComponent(), type: DraggableTextareaComponent },
    { component: new DraggableButtonComponent(), type: DraggableButtonComponent },
    { component: new DraggableCheckboxComponent(), type: DraggableCheckboxComponent },
    { component: new DraggableSelectComponent(), type: DraggableSelectComponent }
  ];

  constructor() {
  }

  ngOnInit(): void {

  }
}
