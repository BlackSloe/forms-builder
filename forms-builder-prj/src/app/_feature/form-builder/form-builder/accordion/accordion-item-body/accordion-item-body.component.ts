import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { IFormBuilderStyles } from 'src/app/_shared/interfaces/form-builder-styles.interface';

@Component({
  selector: 'app-accordion-item-body',
  templateUrl: './accordion-item-body.component.html',
  styleUrls: ['./accordion-item-body.component.css']
})
export class AccordionItemBodyComponent implements OnInit {
  @Input()
  stylingFormGroup: FormGroup;

  @Input()
  formBuilderStyles$: Observable<IFormBuilderStyles>;

  @Output()
  styilingFormGroupEmitter: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor() { }

  ngOnInit(): void {
  }

  public onFormSubmit(): void {
    this.styilingFormGroupEmitter.emit(this.stylingFormGroup);
  }
}
