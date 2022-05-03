import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnChanges, OnInit, QueryList, Type, ViewChild, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, skip, take } from 'rxjs';
import { FormBuilderFormStyle } from 'src/app/_models/form-builder-form-style';
import { AppState } from 'src/app/_store/app.states';
import { selectDragDropListItem, selectFormBuilderFormStyles } from 'src/app/_store/selectors/form-builder.selectors';
import { DragDropListItem } from 'src/app/_models/drag-drop-list-item.abstract';
import { DynamicListItemComponent } from 'src/app/_shared/directives/dynamic-list-item.component';
import { IDragDropListItemComponent } from 'src/app/_shared/interfaces/drag-drop-list-item-component.interface';
import { DragDropItemComponentType } from 'src/app/_models/drag-drop-item-component-type';
import { setDropSectionListItemStylesAction } from 'src/app/_store/actions/form-builder.actions';

@Component({
  selector: 'app-drop-section',
  templateUrl: './drop-section.component.html',
  styleUrls: ['./drop-section.component.css']
})
export class DropSectionComponent implements OnInit, OnChanges {
  @ViewChildren(DynamicListItemComponent)
  dynamicComponents: QueryList<DynamicListItemComponent>;

  public selectedIndex: number;

  public dragSectionItems: Array<DragDropItemComponentType> = [];


  // public styles$: Observable<FormBuilderFormStyle>;
  public styles: any;

  public dropListItem$: Observable<DragDropListItem>;

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

    this.store.select(selectDragDropListItem).subscribe(styles => {
      if (this.selectedIndex !== - 1) {

        if (this.dynamicComponents) {
          this.dynamicComponents.forEach((item, index) => {
            if (this.selectedIndex === index) {
              item.component.dragDropListItem = styles!;
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

      this.dynamicComponents.changes.subscribe(() => {
        this.dynamicComponents.forEach((item, index) => {
          if (this.selectedIndex === index) {
            this.store.dispatch(setDropSectionListItemStylesAction({ dragDropListItem: item.component.dragDropListItem }));
          }
        });
      });
    }
  }

  public onItemClick(index: number): void {
    this.selectedIndex = index;

    this.dynamicComponents.forEach((item, index) => {
      if (this.selectedIndex === index) {
        this.store.dispatch(setDropSectionListItemStylesAction({ dragDropListItem: item.component.dragDropListItem }));
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
