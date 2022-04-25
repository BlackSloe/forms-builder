import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PortalBridgeService {
    private activePortal = new Subject<ComponentPortal<any>>();

    public readonly portal$ = this.activePortal.asObservable();

    constructor() { }

    public setPortal(portal: ComponentPortal<any>): void {
        this.activePortal.next(portal);
    }
}
