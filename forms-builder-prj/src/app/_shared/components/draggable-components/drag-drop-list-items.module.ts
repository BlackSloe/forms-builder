import { NgModule } from '@angular/core';
import { DraggableButtonComponent } from './draggable-component-button/draggable-button.component';
import { DraggableCheckboxComponent } from './draggable-component-checkbox/draggable-checkbox.component';
import { DraggableInputComponent } from './draggable-component-input/draggable-input.component';
import { DraggableSelectComponent } from './draggable-component-select/draggable-select.component';
import { DraggableTextareaComponent } from './draggable-component-textarea/draggable-textarea.component';

import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';


const material = [
    TextFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatMenuModule
];

@NgModule({
    declarations: [
        DraggableButtonComponent,
        DraggableCheckboxComponent,
        DraggableInputComponent,
        DraggableSelectComponent,
        DraggableTextareaComponent
    ],
    imports: [material, CommonModule],
    exports: [material]
})
export class DragDropListItemsModule { }
