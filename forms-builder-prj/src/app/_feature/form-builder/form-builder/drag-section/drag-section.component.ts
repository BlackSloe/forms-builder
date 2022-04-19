import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag-section',
  templateUrl: './drag-section.component.html',
  styleUrls: ['./drag-section.component.css']
})
export class DragSectionComponent implements OnInit {
  public dragSectionItems = ['Input', 'Textarea', 'Button', 'Checkbox with label', 'Select option'];

  constructor() { }

  ngOnInit(): void {
  }

  public drop(event: CdkDragDrop<string[]>): void {
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // } 
  }

}
