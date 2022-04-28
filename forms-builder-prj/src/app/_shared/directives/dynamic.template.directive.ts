import { ViewContainerRef, Type, ViewChild, Component, Input,  AfterViewInit,  } from '@angular/core';
import { IDragDropListItemComponent } from '../interfaces/drag-drop-list-item-component.interface';

@Component({
    selector: 'dynamic-component',
    template: '<ng-template #container></ng-template>'
})

export class DynamicTemplateListItemComponent implements AfterViewInit {
    @Input()
    componentType: Type<any>;

    public component: IDragDropListItemComponent;

    @ViewChild('container', { static: false, read: ViewContainerRef })
    container: ViewContainerRef;

    constructor() {
    }

    ngAfterViewInit(): void {
        const viewContainerRef = this.container;

        viewContainerRef.clear();

        const componentRef = viewContainerRef
            .createComponent<IDragDropListItemComponent>(this.componentType);

        this.component = componentRef.instance;
    }
}
