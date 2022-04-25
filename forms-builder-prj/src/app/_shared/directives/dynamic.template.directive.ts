import { ViewContainerRef, Directive, Type } from '@angular/core';

@Directive({
    selector: "[dynamic-template]"
})
export class DynamicTemplateDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}

export class DynamicTemplateListItemComponent {
    constructor(public component: Type<any>, public data: any) {
    }
}