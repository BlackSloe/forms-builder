import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { AccordionComponent } from './form-builder/accordion/accordion.component'
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragSectionComponent } from './form-builder/drag-section/drag-section.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { DropSectionComponent } from './form-builder/drop-section/drop-section.component';
import { SharedModule } from 'src/app/_shared/material/shared.module';
import { DragSectionItemComponent } from './form-builder/drag-section/drag-section-item/drag-section-item.component';
import { FormBuilderStylingService } from 'src/app/_services/form-builder-styling.service';
import { PortalBridgeService } from 'src/app/_services/portal-bridge.service';

const material = [
  CdkAccordionModule,
  DragDropModule,
  PortalModule
];

@NgModule({
  declarations: [
    FormBuilderComponent,
    AccordionComponent,
    DragSectionComponent,
    DropSectionComponent,
    DragSectionItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    material
  ],
  exports: [
    material,
    SharedModule
  ],
  providers: [
    PortalBridgeService
  ]
})
export class FormBuilderModule { }
