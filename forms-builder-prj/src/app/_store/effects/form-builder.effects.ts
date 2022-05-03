import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';
import { FormBuilderFormStyle } from 'src/app/_models/form-builder-form-style';
import { FormBuilderStylingService } from 'src/app/_services/form-builder-styling.service';
import { DragDropListItem } from 'src/app/_models/drag-drop-list-item.abstract';
import {
    setDropSectionListItemStylesAction,
    setDropSectionListItemStylesFailedAction,
    setDropSectionListItemStylesSuccessAction,
    setDropSectionStylesAction,
    setDropSectionStylesFailedAction,
    setDropSectionStylesSuccessAction
} from '../actions/form-builder.actions';

@Injectable({ providedIn: 'root' })
export class FormBuilderEffects {
    constructor(private actions: Actions,
        private formBuilderStyleService: FormBuilderStylingService) { }

    setFormBuilderStyles$ = createEffect(() => {
        return this.actions.pipe(
            ofType(setDropSectionStylesAction),
            switchMap((payLoad) => {
                this.formBuilderStyleService.setFormBuilderStyles(payLoad.styleObj);
                const res = this.formBuilderStyleService.isStylesValid(payLoad.styleObj)

                return this.formBuilderStyleService.currentFormBuilderFormStyles$
                    .pipe(
                        map((styles: FormBuilderFormStyle) => {
                            if (res) {
                                return setDropSectionStylesSuccessAction({ styleObj: styles });
                            }

                            return setDropSectionStylesFailedAction({
                                errorMessage: this.formBuilderStyleService.errorMessages.join(', ')
                            });
                        }), tap(() => {
                            console.log(this.formBuilderStyleService.errorMessages);
                            this.formBuilderStyleService.clearErrorMessage();
                        })
                    )
            })
        )
    });

    setDropItemStyles$ = createEffect(() => {
        return this.actions.pipe(
            ofType(setDropSectionListItemStylesAction),
            switchMap((payLoad) => {
                this.formBuilderStyleService.setDragDropListItemStyles(payLoad.dragDropListItem);
                const res = this.formBuilderStyleService.isStylesValid(payLoad.dragDropListItem)

                return this.formBuilderStyleService.currentDragDropListItemStyles$
                    .pipe(
                        map((styles: DragDropListItem) => {
                            if (res) {
                                this.formBuilderStyleService.setDragDropListItemStyles(styles);
                                return setDropSectionListItemStylesSuccessAction({ dradDropListItem: styles });
                            }

                            return setDropSectionListItemStylesFailedAction({ errorMessage: this.formBuilderStyleService.errorMessages.join(', ')});
                        }), tap(() => {
                            console.log(this.formBuilderStyleService.errorMessages);
                            this.formBuilderStyleService.clearErrorMessage();
                        })
                    )
            })
        )
    });
}
