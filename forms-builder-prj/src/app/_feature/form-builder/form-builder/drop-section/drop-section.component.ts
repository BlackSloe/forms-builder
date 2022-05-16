import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, takeUntil } from 'rxjs';

import { AppState } from 'src/app/_store/app.states';
import { DynamicDraggableItemComponent } from 'src/app/_shared/components/dynamic-list-item.component';
import { DraggableItemComponentType } from 'src/app/_models/draggable/draggable-item-component-type';
import { setDraggableItemStylesAction } from 'src/app/_store/actions/form-builder.actions';
import {
  selectDraggableItemStyles,
  selectFormBuilderFormStyles
} from 'src/app/_store/selectors/form-builder.selectors';

@Component({
  selector: 'app-drop-section',
  templateUrl: './drop-section.component.html',
  styleUrls: ['./drop-section.component.css']
})
export class DropSectionComponent implements OnInit, OnDestroy {
  @ViewChildren(DynamicDraggableItemComponent)
  dynamicComponents: QueryList<DynamicDraggableItemComponent>;

  public selectedIndex: number;

  public draggableItems: DraggableItemComponentType[] = [];

  public formStyles$: Observable<any>;

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.formStyles$ = this.store.select(selectFormBuilderFormStyles).pipe(map(formStyle => {
      const formStylesKeyValue: any = {};

      for (const style of formStyle.styles) {
        formStylesKeyValue[style.propName] = style.propValue;
      }

      return formStylesKeyValue;
    }), takeUntil(this._destroy$));

    this.store.select(selectDraggableItemStyles).subscribe(styles => {

      if (this.dynamicComponents) {
        this.dynamicComponents.forEach((item, index) => {

          if (this.selectedIndex === index) {
            item.component.draggableItemStyles = styles!;
          }

        })
      }
    }), takeUntil(this._destroy$);
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

  public drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.selectedIndex = event.currentIndex;
    }
  }

  public onItemClick(_index: number): void {
    this.selectedIndex = _index;

    this.dynamicComponents.forEach((item, index) => {
      if (this.selectedIndex === index) {
        this.store.dispatch(setDraggableItemStylesAction({ styles: item.component.draggableItemStyles }));
      }
    })
  }

  public onItemCloseClick(_arrIndex: number): void {
    this.draggableItems.forEach((item, arrIndex) => {
      if (arrIndex === _arrIndex) {
        this.draggableItems.splice(arrIndex, 1);
      }
    });
  }
}
