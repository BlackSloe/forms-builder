import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragSectionItemComponent } from './drag-section-item.component';

describe('DragSectionItemComponent', () => {
  let component: DragSectionItemComponent;
  let fixture: ComponentFixture<DragSectionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragSectionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragSectionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
