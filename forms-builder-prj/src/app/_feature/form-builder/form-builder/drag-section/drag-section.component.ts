import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CdkPortal, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { PortalBridgeService } from 'src/app/_services/portal-bridge.service';

@Component({
  selector: 'app-drag-section',
  templateUrl: './drag-section.component.html',
  styleUrls: ['./drag-section.component.css']
})
export class DragSectionComponent implements OnInit, OnDestroy {
  @ViewChild(CdkPortal, { static: true })
  portalContent: CdkPortal;

  // componentPortal: ComponentPortal;

  public dragSectionItems = ['Input', 'Textarea', 'Button', 'Checkbox with label', 'Select option'];

  constructor(private portalBridgeService: PortalBridgeService,
    private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    // this.someFunc();
  }

  ngOnDestroy(): void {
    this.portalContent.detach();
  }

  public drop(event: CdkDragDrop<string[]>): void {
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // }
    console.log('123');
    if (event.previousContainer !== event.container) {
      console.log('wow!');
    }
  }


  // future logic of portal
  private someFunc(): void {
    // const portal = new TemplatePortal(this.portalContent, this.viewContainerRef);
    this.portalBridgeService.setPortal(this.portalContent);
  }
}
