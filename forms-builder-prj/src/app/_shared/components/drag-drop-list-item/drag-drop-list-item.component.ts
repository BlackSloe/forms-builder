import { AfterViewInit, Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DragDropListItem } from '../../abstract/drag-drop-list-item.abstract';
import { DynamicTemplateDirective, DynamicTemplateListItemComponent } from '../../directives/dynamic.template.directive';
import { DragDropListItemInputComponent } from '../drag-drop-list-items/drag-drop-list-item-input/drag-drop-list-item-input.component';

@Component({
  selector: 'app-drag-drop-list-item',
  templateUrl: './drag-drop-list-item.component.html',
  styleUrls: ['./drag-drop-list-item.component.css']
})
export class DragDropListItemComponent implements OnInit, AfterViewInit {
  @Input() 
  component: DynamicTemplateListItemComponent;

  @ViewChild('dynamicComponent', { read: ViewContainerRef })
  dynamicTemplate: ViewContainerRef;
  
  constructor() { }

  ngAfterViewInit(): void {
    this.loadComponents();
  }

  ngOnInit(): void {
    // this.loadComponents();
  }

  loadComponents(): void {
    const viewContainerRef = this.dynamicTemplate;
    viewContainerRef.clear();

    const componentRef = viewContainerRef
      .createComponent<DynamicTemplateListItemComponent>(this.component.component);
    componentRef.instance.data = this.component.data;
  }

}
