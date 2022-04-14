import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { FormBuilderStyle } from '../_models/form-builder-style';

@Injectable({providedIn: 'root'})
export class FormBuilderStylingService {
    private currentFormBuilderStylesSubject: ReplaySubject<FormBuilderStyle>;
    private _currentFormBuilderStyles$: Observable<FormBuilderStyle>;

    constructor() {
        this.currentFormBuilderStylesSubject = new ReplaySubject<FormBuilderStyle>();
        this._currentFormBuilderStyles$ = this.currentFormBuilderStylesSubject.asObservable();
    }

    public get currentFormBuilderStyles$(): Observable<FormBuilderStyle> {
        return this._currentFormBuilderStyles$;
    }

    newStyle(value: FormBuilderStyle) {
        this.currentFormBuilderStylesSubject.next(value);
    }

    isStylesValid(styles: FormBuilderStyle): boolean {
        return true;
    }
}