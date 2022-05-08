import { CdkAccordionItem, CdkAccordionModule } from '@angular/cdk/accordion';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AccordionTabs } from 'src/app/_enums/accordion-tabs';
import { loadDraggableItemStylesAction, loadDropSectionFormStylesAction } from 'src/app/_store/actions/form-builder.actions';

import { AccordionComponent } from './accordion.component';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;
  let mockStore: MockStore;
  const cdkAccordionItemMock = {} as CdkAccordionItem;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionComponent ],
      imports: [ReactiveFormsModule, CdkAccordionModule],
      providers: [
        provideMockStore({})
      ]
    })
    .compileComponents();

    mockStore = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('accordionItemClick', () => {
    beforeEach(() => {
      cdkAccordionItemMock.toggle = () => {};
    });

    it('should dispatch loadDropSectionFormStylesAction if selected tab is general form styiling', () => {
        const dispatchSpy = spyOn(component['store'], 'dispatch');

        component.accordionItemClick(cdkAccordionItemMock, AccordionTabs.FORM_GENERAL_STYILING);

        expect(dispatchSpy).toHaveBeenCalledWith(loadDropSectionFormStylesAction());
    });

    it('should dispatch loadDraggableItemStylesAction if selected tab is field styiling', () => {
      const dispatchSpy = spyOn(component['store'], 'dispatch');

      component.dragDropListItemFormGroup = new FormBuilder().group({});
      component.accordionItemClick(cdkAccordionItemMock, AccordionTabs.FIELD_STYILING);

      expect(dispatchSpy).toHaveBeenCalledWith(loadDraggableItemStylesAction());
    });
  });
});
