import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs';
import { FormBuilderFormStyles } from 'src/app/_models/form-builder-form-styles';
import { FormBuilderStylingService } from 'src/app/_services/form-builder-styling.service';
import { DraggableItemStyles } from 'src/app/_models/draggable/draggable-item-styles';
import {
    setSelectedDraggableItemStylesAction,
    setSelectedDraggableItemStylesSuccessAction,
    setDropSectionStylesAction,
    setDropSectionStylesFailedAction,
    setDropSectionStylesSuccessAction,
    setSelectedDraggableItemStylesFailedAction
} from '../actions/form-builder.actions';

@Injectable({ providedIn: 'root' })
export class FormBuilderEffects {
    constructor(private actions: Actions,
        private formBuilderStyilingService: FormBuilderStylingService) { }

    setFormBuilderStyles$ = createEffect(() => {
        return this.actions.pipe(
            ofType(setDropSectionStylesAction),
            switchMap((payLoad) => {
                const isStylesValid = this.formBuilderStyilingService.isStylesValid(payLoad.styles);

                this.formBuilderStyilingService.setFormBuilderStyles(payLoad.styles);

                return this.formBuilderStyilingService.currentFormBuilderFormStyles$
                    .pipe(
                        map((styles: FormBuilderFormStyles) => {
                            if (isStylesValid) {
                                return setDropSectionStylesSuccessAction({ styles });
                            }
                            const errorMessage = this.formBuilderStyilingService.errorMessages.join(', ');
                            this.formBuilderStyilingService.clearErrorMessage();

                            return setDropSectionStylesFailedAction({ errorMessage });
                        })
                    )
            })
        )
    });

    setDropItemStyles$ = createEffect(() => {
        return this.actions.pipe(
            ofType(setSelectedDraggableItemStylesAction),
            switchMap((payLoad) => {
                const isStylesValid = this.formBuilderStyilingService.isStylesValid(payLoad.styles);

                this.formBuilderStyilingService.setDraggableItemStyles(payLoad.styles);

                return this.formBuilderStyilingService.currentDraggableItemStyles$
                    .pipe(
                        map((styles: DraggableItemStyles) => {
                            if (isStylesValid) {
                                return setSelectedDraggableItemStylesSuccessAction({ styles });
                            }
                            const errorMessage = this.formBuilderStyilingService.errorMessages.join(', ');
                            this.formBuilderStyilingService.clearErrorMessage();

                            return setSelectedDraggableItemStylesFailedAction({ errorMessage });
                        })
                    )
            })
        )
    });
}
