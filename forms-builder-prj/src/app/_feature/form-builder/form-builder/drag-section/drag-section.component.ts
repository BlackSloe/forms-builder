import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CdkPortal, ComponentPortal, DomPortal } from '@angular/cdk/portal';
import { Component, Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PortalBridgeService } from 'src/app/_services/portal-bridge.service';
import { DragDropListItemComponent } from 'src/app/_shared/components/drag-drop-list-item/drag-drop-list-item.component';
import { DragDropListItemButtonComponent } from 'src/app/_shared/components/drag-drop-list-items/drag-drop-list-item-button/drag-drop-list-item-button.component';
import { DragDropListItemCheckboxComponent } from 'src/app/_shared/components/drag-drop-list-items/drag-drop-list-item-checkbox/drag-drop-list-item-checkbox.component';
import { DragDropListItemInputComponent } from 'src/app/_shared/components/drag-drop-list-items/drag-drop-list-item-input/drag-drop-list-item-input.component';
import { DragDropListItemSelectComponent } from 'src/app/_shared/components/drag-drop-list-items/drag-drop-list-item-select/drag-drop-list-item-select.component';
import { DragDropListItemTextareaComponent } from 'src/app/_shared/components/drag-drop-list-items/drag-drop-list-item-textarea/drag-drop-list-item-textarea.component';
import { DynamicTemplateListItemComponent } from 'src/app/_shared/directives/dynamic.template.directive';

@Component({
  selector: 'app-drag-section',
  templateUrl: './drag-section.component.html',
  styleUrls: ['./drag-section.component.css']
})
export class DragSectionComponent implements OnInit, OnDestroy {
  @ViewChild(CdkPortal, { static: true })
  portalContent: CdkPortal;

  public componentPortal: ComponentPortal<DragDropListItemComponent>;

  public dragSectionItems: DynamicTemplateListItemComponent[] = [
    new DynamicTemplateListItemComponent(DragDropListItemInputComponent, ''),
    new DynamicTemplateListItemComponent(DragDropListItemTextareaComponent, ''),
    new DynamicTemplateListItemComponent(DragDropListItemButtonComponent, ''),
    new DynamicTemplateListItemComponent(DragDropListItemCheckboxComponent, ''),
    new DynamicTemplateListItemComponent(DragDropListItemSelectComponent, ''),
  ];


  constructor(private portalBridgeService: PortalBridgeService) { }

  ngOnInit(): void {
    this.componentPortal = new ComponentPortal(DragDropListItemComponent);
    this.portalBridgeService.setPortal(this.componentPortal);
  }

  ngOnDestroy(): void {
    this.componentPortal.detach();
  }

  public drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer !== event.container) {
      console.log('wow!');
    }
  }
}
