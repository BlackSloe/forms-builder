import { ViewContainerRef, Type, ViewChild, Component, Input,  AfterViewInit,  } from '@angular/core';
import { DraggableItemComponent } from './draggable-item.component';

@Component({
    selector: 'dynamic-component',
    template: '<ng-template #container></ng-template>'
})

export class DynamicListItemComponent implements AfterViewInit {
    @Input()
    componentType: Type<any>;

    public component: DraggableItemComponent;

    @ViewChild('container', { static: false, read: ViewContainerRef })
    container: ViewContainerRef;

    constructor() {
    }

    ngAfterViewInit(): void {
        const viewContainerRef = this.container;

        viewContainerRef.clear();

        const componentRef = viewContainerRef
            .createComponent<DraggableItemComponent>(this.componentType);

        this.component = componentRef.instance;
    }
}
