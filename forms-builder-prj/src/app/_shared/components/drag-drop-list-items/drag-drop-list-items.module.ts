import { NgModule } from '@angular/core';
import { DragDropListItemButtonComponent } from './drag-drop-list-item-button/drag-drop-list-item-button.component';
import { DragDropListItemCheckboxComponent } from './drag-drop-list-item-checkbox/drag-drop-list-item-checkbox.component';
import { DragDropListItemInputComponent } from './drag-drop-list-item-input/drag-drop-list-item-input.component';
import { DragDropListItemSelectComponent } from './drag-drop-list-item-select/drag-drop-list-item-select.component';
import { DragDropListItemTextareaComponent } from './drag-drop-list-item-textarea/drag-drop-list-item-textarea.component';

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
import { BrowserModule } from '@angular/platform-browser';


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
        DragDropListItemButtonComponent,
        DragDropListItemCheckboxComponent,
        DragDropListItemInputComponent,
        DragDropListItemSelectComponent,
        DragDropListItemTextareaComponent
    ],
    imports: [material, CommonModule],
    exports: [material]
})
export class DragDropListItemsModule { }
