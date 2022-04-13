import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const material = [
  MatInputModule,
  MatFormFieldModule
];

@NgModule({
  imports: [material],
  exports: [material]
})
export class SharedMaterialModule { }
