import { CdkAccordionItem, CdkAccordionModule } from '@angular/cdk/accordion';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AccordionTabs } from 'src/app/_enums/accordion-tabs';
import { DraggableItemStyles } from 'src/app/_models/draggable/draggable-item-styles';
import { FormBuilderFormStyles } from 'src/app/_models/form-builder-form-styles';
import { loadDraggableItemStylesAction, loadFormBuilderFormStylesAction, setDraggableItemStylesAction, setFormBuilderStylesAction, setSelectedDraggableItemStylesAction } from 'src/app/_store/actions/form-builder.actions';
import { selectDraggableItemStyles, selectFormBuilderFormStyles } from 'src/app/_store/selectors/form-builder.selectors';

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

        expect(dispatchSpy).toHaveBeenCalledWith(loadFormBuilderFormStylesAction());
    });

    it('should dispatch loadDraggableItemStylesAction if selected tab is field styiling', () => {
      const dispatchSpy = spyOn(component['store'], 'dispatch');

      component.draggableItemFormGroup = new FormBuilder().group({});
      component.accordionItemClick(cdkAccordionItemMock, AccordionTabs.FIELD_STYILING);

      expect(dispatchSpy).toHaveBeenCalledWith(loadDraggableItemStylesAction());
    });
  });

  describe('get currentStyles$', () => {
    it('should return form builder styles', () => {
      const mockFormBuilderStyles = new FormBuilderFormStyles();
      
      mockStore.dispatch(setFormBuilderStylesAction({ styles: mockFormBuilderStyles }));
      mockStore.dispatch(loadFormBuilderFormStylesAction());
      component.selectedTab = AccordionTabs.FORM_GENERAL_STYILING;

      component.currentStyles$.subscribe(actualStyles => {
        expect(actualStyles).toEqual(mockFormBuilderStyles);
      });
    });

    it('should return corrent current form builder styles', () => {
      const mockDraggableItemStyles = new DraggableItemStyles();
      
      mockStore.dispatch(setDraggableItemStylesAction({ styles: mockDraggableItemStyles }));
      mockStore.dispatch(loadDraggableItemStylesAction());
      component.selectedTab = AccordionTabs.FIELD_STYILING;

      component.currentStyles$.subscribe(actualStyles => {
        expect(actualStyles).toEqual(mockDraggableItemStyles);
      });
    });
  });

  describe('ngOnInit', () => {
    it('should call slylesAsKeyValue', () => {
      const mockDraggableItemStyles = new DraggableItemStyles();
      const stylesAsKeyValue = spyOn<any>(component, 'stylesAsKeyValue');

      mockStore.overrideSelector(selectDraggableItemStyles, mockDraggableItemStyles);
      component.ngOnInit();

      expect(stylesAsKeyValue).toHaveBeenCalled();
      expect(component.currentFormGroup).toEqual(component.draggableItemFormGroup);
    });
  });

  describe('onFormSubmit', () => {
    it('should dispatch setFormBuilderStylesAction', () => {
      const setStylesSpy = spyOn<any>(component, 'setStyles');

      const formGroup = new FormBuilder().group({ 'minWidth': '123', 'borderStyle': 'dotted' });
      const mockFormBuilderStyles = new FormBuilderFormStyles();
      
      mockFormBuilderStyles.styles.find((v) => v.propName === 'minWidth').propValue = '123';
      mockFormBuilderStyles.styles.find((v) => v.propName === 'borderStyle').propValue = 'dotted';
      
      component.selectedTab = AccordionTabs.FORM_GENERAL_STYILING;
      component['_formBuilderFormStyles'] = new FormBuilderFormStyles();
      component.onFormSubmit(formGroup);

      expect(setStylesSpy).toHaveBeenCalledWith(new FormBuilderFormStyles().styles, formGroup);
    });
  });
});


