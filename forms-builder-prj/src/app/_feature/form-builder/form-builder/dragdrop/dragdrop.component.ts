import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilderStyle } from 'src/app/_models/form-builder-style';
import { FormBuilderStylingService } from 'src/app/_services/form-builder-styling.service';
import { AppState } from 'src/app/_store/app.states';
import { selectFormBuilderStyles } from 'src/app/_store/selectors/form-builder.selectors';

@Component({
  selector: 'app-dragdrop',
  templateUrl: './dragdrop.component.html',
  styleUrls: ['./dragdrop.component.css']
})
export class DragdropComponent implements OnInit {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  public styles: Observable<FormBuilderStyle>;

  constructor(private store: Store<AppState>) {
    this.styles = new Observable<FormBuilderStyle>();
  }

  ngOnInit(): void {
    this.styles = this.store.select(selectFormBuilderStyles);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
