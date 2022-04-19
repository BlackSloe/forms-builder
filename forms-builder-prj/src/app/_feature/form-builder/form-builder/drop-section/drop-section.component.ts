import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilderStyle } from 'src/app/_models/form-builder-style';
import { AppState } from 'src/app/_store/app.states';
import { selectFormBuilderStyles } from 'src/app/_store/selectors/form-builder.selectors';

@Component({
  selector: 'app-drop-section',
  templateUrl: './drop-section.component.html',
  styleUrls: ['./drop-section.component.css']
})
export class DropSectionComponent implements OnInit {
  public todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  public styles: Observable<FormBuilderStyle>;
  
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.styles = this.store.select(selectFormBuilderStyles);
  }

  public drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    // else {
    //   transferArrayItem(
    //     event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex,
    //   );
    // }
  }

  public onItemClick(event: any): void {
    console.log(typeof event);
  }
}
