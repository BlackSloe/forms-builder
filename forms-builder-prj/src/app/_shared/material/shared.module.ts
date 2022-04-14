import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const material = [
  MatInputModule,
  MatFormFieldModule
];

@NgModule({
  imports: [material, ReactiveFormsModule],
  exports: [material, ReactiveFormsModule]
})
export class SharedModule { }
