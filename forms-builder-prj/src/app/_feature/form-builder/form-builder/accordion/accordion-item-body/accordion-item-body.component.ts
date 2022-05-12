import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IFormBuilderStyles } from 'src/app/_shared/interfaces/form-builder-styles.interface';

@Component({
  selector: 'app-accordion-item-body',
  templateUrl: './accordion-item-body.component.html',
  styleUrls: ['./accordion-item-body.component.css']
})
export class AccordionItemBodyComponent implements OnInit, OnDestroy {
  @Input()
  stylingFormGroup: FormGroup;

  @Input()
  formBuilderStyles$: Observable<IFormBuilderStyles>;

  @Output()
  styilingFormGroupEmitter: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  private _destroy: Subscription;

  constructor() { }

  ngOnInit(): void {
    this._destroy = this.formBuilderStyles$.subscribe();
  }

  ngOnDestroy(): void {
    this._destroy.unsubscribe();
  }

  public onFormSubmit(): void {
    this.styilingFormGroupEmitter.emit(this.stylingFormGroup);
  }
}
