import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnChanges, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/_store/app.states';
import { selectDraggableItemStyles, selectFormBuilderFormStyles } from 'src/app/_store/selectors/form-builder.selectors';
import { DraggableItemStyles } from 'src/app/_models/draggable/draggable-item-styles';
import { DynamicListItemComponent } from 'src/app/_shared/components/dynamic-list-item.component';
import { DraggableItemComponent } from 'src/app/_shared/components/draggable-item.component';
import { DraggableItemComponentType } from 'src/app/_models/draggable/draggable-item-component-type';
import { setDraggableItemStylesAction } from 'src/app/_store/actions/form-builder.actions';

@Component({
  selector: 'app-drop-section',
  templateUrl: './drop-section.component.html',
  styleUrls: ['./drop-section.component.css']
})
export class DropSectionComponent implements OnInit, OnChanges {
  @ViewChildren(DynamicListItemComponent)
  dynamicComponents: QueryList<DynamicListItemComponent>;

  public selectedIndex: number;

  public dragSectionItems: Array<DraggableItemComponentType> = [];

  public styles: any;

  public dropListItem$: Observable<DraggableItemStyles>;

  constructor(private store: Store<AppState>) {}

  ngOnChanges(): void {
  }

  ngOnInit(): void {
    this.store.select(selectFormBuilderFormStyles).subscribe(formStyle => {
      const obj: any = {};

      for (const style of formStyle.styles) {
        obj[style.propName] = style.propValue;
      }
      this.styles = obj;
    });;

    this.store.select(selectDraggableItemStyles).subscribe(styles => {
      if (this.selectedIndex !== - 1) {

        if (this.dynamicComponents) {
          this.dynamicComponents.forEach((item, index) => {
            if (this.selectedIndex === index) {
              item.component.draggableItemStyles = styles!;
            }
          })
        }
      }
    });
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

      // this.dynamicComponents.changes.subscribe(() => {
      //   this.dynamicComponents.forEach((item, index) => {
      //     if (this.selectedIndex === index) {
      //       this.store.dispatch(setDraggableItemStylesAction({ styles: item.component.draggableItemStyles }));
      //     }
      //   });
      // });
    }
  }

  public onItemClick(index: number): void {
    this.selectedIndex = index;

    this.dynamicComponents.forEach((item, index) => {
      if (this.selectedIndex === index) {
        this.store.dispatch(setDraggableItemStylesAction({ styles: item.component.draggableItemStyles }));
      }
    })
  }

  public onItemCloseClick(_arrIndex: number): void {
    this.dragSectionItems.forEach((item, arrIndex) => {
      if (arrIndex === _arrIndex) {
        this.dragSectionItems.splice(arrIndex, 1);
      }
    });
  }
}
