import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DraggableItemComponentType } from 'src/app/_models/draggable-item-component-type';
import { DragDropListItemCheckboxComponent } from 'src/app/_shared/components/drag-drop-list-items/drag-drop-list-item-checkbox/drag-drop-list-item-checkbox.component';
import { DynamicListItemComponent } from 'src/app/_shared/directives/dynamic-list-item.component';

import { DropSectionComponent } from './drop-section.component';

describe('DropSectionComponent', () => {
  let component: DropSectionComponent;
  let fixture: ComponentFixture<DropSectionComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropSectionComponent ],
      imports: [DragDropModule],
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

  describe('onItemCloseClick', () => {
    it('should remove item from array', () => {
      const mockComponents = [{} as DraggableItemComponentType, {} as DraggableItemComponentType, {} as DraggableItemComponentType]
      component.dragSectionItems = mockComponents;
    
      component.onItemCloseClick(1);

      expect(component.dragSectionItems.length).toEqual(2);
    });
  });

  describe('onItemClick', () => {
    it('should select index of selected component in array', () => {
      const mockComponents = [{} as DraggableItemComponentType, {} as DraggableItemComponentType, {} as DraggableItemComponentType]
      component.dragSectionItems = mockComponents;

      component.onItemClick(1);

      expect(component.selectedIndex).toEqual(1);
    });
  });
});
