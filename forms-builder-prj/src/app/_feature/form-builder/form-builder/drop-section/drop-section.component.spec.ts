import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveComponentModule } from '@ngrx/component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DraggableItemComponentType } from 'src/app/_models/draggable/draggable-item-component-type';
import { FormBuilderFormStyles } from 'src/app/_models/form-builder-form-styles';
import { setFormBuilderStylesAction } from 'src/app/_store/actions/form-builder.actions';

import { DropSectionComponent } from './drop-section.component';

describe('DropSectionComponent', () => {
  let component: DropSectionComponent;
  let fixture: ComponentFixture<DropSectionComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropSectionComponent ],
      imports: [DragDropModule, ReactiveComponentModule],
      providers: [provideMockStore({})]
    })
    .compileComponents();

    mockStore = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should map form builder form styles as key value object', () => {
      const mockStyles = new FormBuilderFormStyles();
      const formStylesKeyValue: any = {};

      for (const style of mockStyles.styles) {
        formStylesKeyValue[style.propName] = style.propValue;
      }

      mockStore.dispatch(setFormBuilderStylesAction({ styles: mockStyles }));

      const obs$ = component.formStyles$;

      obs$.subscribe(result => {
        expect(result).toBeTruthy();
        expect(result).toBe(formStylesKeyValue);
      });
    });
  });

  describe('onItemCloseClick', () => {
    it('should remove item from array', () => {
      const mockComponents = [
        {} as DraggableItemComponentType,
        {} as DraggableItemComponentType,
        {} as DraggableItemComponentType
      ];
      component.draggableItems = mockComponents;

      component.onItemCloseClick(1);

      expect(component.draggableItems.length).toEqual(2);
    });
  });

  describe('onItemClick', () => {
    it('should select index of selected component in array', () => {
      const mockComponents = [
        {} as DraggableItemComponentType,
        {} as DraggableItemComponentType,
        {} as DraggableItemComponentType
      ];
      component.draggableItems = mockComponents;

      component.onItemClick(1);

      expect(component.selectedIndex).toEqual(1);
    });
  });
});
