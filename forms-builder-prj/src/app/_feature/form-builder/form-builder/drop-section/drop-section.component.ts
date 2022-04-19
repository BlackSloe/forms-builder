import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilderStyle } from 'src/app/_models/form-builder-style';
import { AppState } from 'src/app/_store/app.states';
import { selectFormBuilderStyles } from 'src/app/_store/selectors/form-builder.selectors';
import { PortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { PortalBridgeService } from 'src/app/_services/portal-bridge.service';

@Component({
  selector: 'app-drop-section',
  templateUrl: './drop-section.component.html',
  styleUrls: ['./drop-section.component.css']
})
export class DropSectionComponent implements OnInit {
  public portal$: Observable<TemplatePortal>;

  public todo: string[] = [];
  public styles: Observable<FormBuilderStyle>;

  constructor(private store: Store<AppState>,
      private portalBridgeService: PortalBridgeService) { }

  ngOnInit(): void {
    this.styles = this.store.select(selectFormBuilderStyles);
    this.portal$ = this.portalBridgeService.portal$;
  }

  public drop(event: CdkDragDrop<string[]>): void {
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
  }

  // public onItemClick(event: any): void {
  //   console.log(typeof event);
  // }
}
