import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { AccordionComponent } from './form-builder/accordion/accordion.component'
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { PortalComponent } from './form-builder/portal/portal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { DragdropComponent } from './form-builder/dragdrop/dragdrop.component';
import { SharedModule } from 'src/app/_shared/material/shared.module';

const material = [
  CdkAccordionModule,
  DragDropModule,
  PortalModule
];

@NgModule({
  declarations: [
    FormBuilderComponent,
    AccordionComponent,
    PortalComponent,
    DragdropComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    material
  ],
  exports: [
    material,
    SharedModule
  ]
})
export class FormBuilderModule { }
