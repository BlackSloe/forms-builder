import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-drag-drop-list-item',
  templateUrl: './drag-drop-list-item.component.html',
  styleUrls: ['./drag-drop-list-item.component.css']
})
export class DragDropListItemComponent<T> implements OnInit, AfterViewInit {
  @Input()
  component: any;

  @Input()
  type: T;
  // @Input()
  // type: Type<any>;

  // @ViewChild('dynamicComponent', { read: ViewContainerRef })
  // dynamicTemplate: ViewContainerRef;

  constructor() {

  }

  ngAfterViewInit(): void {
    this.loadComponents();
  }

  ngOnInit(): void {
    console.log(`Hello ${this.type}`);
    // console.log(this.component);
    // let t: Type<IDragDropListItemComponent>;
  }

  loadComponents(): void {
    // const viewContainerRef = this.dynamicTemplate;
    // viewContainerRef.clear();
    // ;
    // const l = Type(this.component.constructor.name);

    // const componentRef = viewContainerRef
    //   .createComponent<IDragDropListItemComponent>(this.type);

    // console.log(componentRef.instance);
    //   componentRef.instance.dragDropListItem = this.component.dragDropListItem;

  }

}
