import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { FormBuilderFormStyle } from 'src/app/_models/form-builder-form-style';
import { Observable } from 'rxjs';
import { DragDropListItem } from 'src/app/_shared/abstract/drag-drop-list-item.abstract';

@Component({
  selector: 'app-accordion-item-body',
  templateUrl: './accordion-item-body.component.html',
  styleUrls: ['./accordion-item-body.component.css']
})
export class AccordionItemBodyComponent implements OnInit {
  @Input()
  stylingFormGroup: FormGroup;

  @Input()
  formBuilderStyles$: Observable<FormBuilderFormStyle> | Observable<DragDropListItem>;

  @Output()
  styilingFormGroupEmitter: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor() { }

  ngOnInit(): void {
    // this.formBuilderStyles$.subscribe(ll => console.log(ll));
    // console.log(this.dropSectionStylingForm.controls);
  }

  public onFormSubmit(): void {
    this.styilingFormGroupEmitter.emit(this.stylingFormGroup);
  }
}
