import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveComponentModule } from '@ngrx/component';

import { FormBuilderComponent } from './form-builder/form-builder.component';
import { AccordionComponent } from './form-builder/accordion/accordion.component'
import { DropSectionComponent } from './form-builder/drop-section/drop-section.component';
import { SharedModule } from 'src/app/_shared/material/shared.module';
import { DragSectionComponent } from './form-builder/drag-section/drag-section.component';
import { AccordionItemBodyComponent } from './form-builder/accordion/accordion-item-body/accordion-item-body.component';
import { SeparatorPipe } from 'src/app/_shared/pipes/input-field-separator.pipe';
import { UnitAppenderPipe } from 'src/app/_shared/pipes/input-field-unit-appender.pipe';
import { DynamicDraggableItemComponent } from 'src/app/_shared/components/dynamic-list-item.component';
import { DragDropListItemsModule } from 'src/app/_shared/components/draggable-components/drag-drop-list-items.module';

const material = [
  CdkAccordionModule,
  DragDropModule
];

@NgModule({
  declarations: [
    FormBuilderComponent,
    AccordionComponent,
    DropSectionComponent,
    DragSectionComponent,
    AccordionItemBodyComponent,
    SeparatorPipe,
    UnitAppenderPipe,
    DynamicDraggableItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DragDropListItemsModule,
    material,
    ReactiveComponentModule
  ],
  exports: [
    material,
    SharedModule
  ]
})
export class FormBuilderModule { }
