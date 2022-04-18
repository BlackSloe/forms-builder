import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { FormBuilderStyle } from "src/app/_models/form-builder-style";
import { FormBuilderStylingService } from "src/app/_services/form-builder-styling.service";
import { setDropSectionStylesAction, setDropSectionStylesFailedAction, setDropSectionStylesSuccessAction } from "../actions/form-builder.actions";

@Injectable({ providedIn: 'root' })
export class FormBuilderEffects {
    constructor(private actions: Actions,
        private formBuilderStyleService: FormBuilderStylingService) { }

    loadStyles$ = createEffect(() => {
        return this.actions.pipe(
            ofType(setDropSectionStylesAction),
            switchMap((payLoad) => {
                this.formBuilderStyleService.newStyle(payLoad.styleObj);
                this.formBuilderStyleService.validateStyles();

                return this.formBuilderStyleService.currentFormBuilderStyles$
                    .pipe(
                        map((styles: FormBuilderStyle) => {
                            // console.log('1');
                            if (this.formBuilderStyleService.isStylesValid) {
                                // console.log(styles);
                                return setDropSectionStylesSuccessAction({ styleObj: styles });
                            }
                            return setDropSectionStylesFailedAction({ 
                                errorMessage: this.formBuilderStyleService.errorMessages.join(', ')
                            });
                        })
                    )
            })
        )
    });
}