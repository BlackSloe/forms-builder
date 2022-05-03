import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { AccordionItemBodyComponent } from './accordion-item-body.component';

describe('AccordionItemBodyComponent', () => {
  let component: AccordionItemBodyComponent;
  let fixture: ComponentFixture<AccordionItemBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionItemBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionItemBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onFormSubmit', () => {
    it('should emit form', () => {
      const emitSpy = spyOn(component.styilingFormGroupEmitter, 'emit');
      const formGroup = new FormBuilder().group({ hello: [''], goodbye: [''] }); 

      component.stylingFormGroup = formGroup;
      component.onFormSubmit();

      expect(emitSpy).toHaveBeenCalledWith(formGroup);
    });
  });
});
