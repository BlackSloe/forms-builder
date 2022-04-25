import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilderFormStyle } from 'src/app/_models/form-builder-form-style';
import { AppState } from 'src/app/_store/app.states';
import { selectFormBuilderFormStyles } from 'src/app/_store/selectors/form-builder.selectors';
import { DragDropListItem } from 'src/app/_shared/abstract/drag-drop-list-item.abstract';
import { DynamicTemplateListItemComponent } from 'src/app/_shared/directives/dynamic.template.directive';
import { setDropSectionListItemStylesAction } from 'src/app/_store/actions/form-builder.actions';

@Component({
  selector: 'app-drop-section',
  templateUrl: './drop-section.component.html',
  styleUrls: ['./drop-section.component.css']
})
export class DropSectionComponent implements OnInit {
  public selectedIndex: number;

  public dragSectionItems: DynamicTemplateListItemComponent[] = [];

  public styles$: Observable<FormBuilderFormStyle>;
  public styles: any;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.styles$ = this.store.select(selectFormBuilderFormStyles);

    this.styles$.subscribe(formStyle => {
      const obj: any = {};

      for (let style of formStyle.styles) {
        obj[style.propName] = style.propValue;
      }
      this.styles = obj;
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
    }
    this.selectedIndex = event.currentIndex;
  }

  public onItemClick(index: number): void {
    this.selectedIndex = index;
    console.log(this.dragSectionItems[this.selectedIndex].component);
    // this.store.dispatch(setDropSectionListItemStylesAction())
  }

  public onItemCloseClick(_arrIndex: number): void {
    this.dragSectionItems.forEach((item, arrIndex) => {
      if (arrIndex === _arrIndex) {
        this.dragSectionItems.splice(arrIndex, 1);
      }
    });
  }
}
