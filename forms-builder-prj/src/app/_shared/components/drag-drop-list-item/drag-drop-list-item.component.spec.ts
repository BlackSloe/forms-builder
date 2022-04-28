import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropListItemComponent } from './drag-drop-list-item.component';

describe('DragDropListItemComponent', () => {
  let component: DragDropListItemComponent<any>;
  let fixture: ComponentFixture<DragDropListItemComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
