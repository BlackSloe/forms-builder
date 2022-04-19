import { TemplatePortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PortalBridgeService {
    private activePortal = new Subject<TemplatePortal>();

    public readonly portal$ = this.activePortal.asObservable();

    constructor() { }

    public setPortal(portal: TemplatePortal): void {
        this.activePortal.next(portal);
    }
}
