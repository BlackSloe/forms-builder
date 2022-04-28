import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { AccordionComponent } from './form-builder/accordion/accordion.component'
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { DropSectionComponent } from './form-builder/drop-section/drop-section.component';
import { SharedModule } from 'src/app/_shared/material/shared.module';
import { DragDropListItemModule } from 'src/app/_shared/components/drag-drop-list-item/drag-drop-list-item.module';
import { DragSectionComponent } from './form-builder/drag-section/drag-section.component';
import { MatIconModule } from '@angular/material/icon';
import { AccordionItemBodyComponent } from './form-builder/accordion/accordion-item-body/accordion-item-body.component';
import { SeparatorPipe } from 'src/app/_shared/pipes/input-field-separator.pipe';
import { UnitAppenderPipe } from 'src/app/_shared/pipes/input-field-unit-appender.pipe';
import { ReactiveComponentModule } from '@ngrx/component';
import { DynamicTemplateListItemComponent } from 'src/app/_shared/directives/dynamic.template.directive';

const material = [
  CdkAccordionModule,
  DragDropModule,
  PortalModule,
  MatIconModule
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
    DynamicTemplateListItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DragDropListItemModule,
    material,
    ReactiveComponentModule
  ],
  exports: [
    material,
    DragDropListItemModule,
    SharedModule
  ]
})
export class FormBuilderModule { }
