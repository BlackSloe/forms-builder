import { CdkAccordionItem } from '@angular/cdk/accordion';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { finalize, Observable, tap } from 'rxjs';
import { FormBuilderFormStyle } from 'src/app/_models/form-builder-form-style';
import { loadDropSectionFormStylesAction, loadDropSectionListItemStylesAction, setDropSectionStylesAction } from 'src/app/_store/actions/form-builder.actions';
import { AppState } from 'src/app/_store/app.states';
import { selectFormBuilderFormStyles } from 'src/app/_store/selectors/form-builder.selectors';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {
  public tabs: string[] = ['Form General Styling', 'Field Styling'];
  public generalFormStyle$!: Observable<FormBuilderFormStyle>;
  public formBuilderStyles: FormBuilderFormStyle;

  expandedIndex = 0;

  dropSectionStylingForm: FormGroup;

  constructor(private store: Store<AppState>,
    private formBuilder: FormBuilder) {

    
    // console.log(this.dropSectionStylingForm);
    
  }

  ngOnInit(): void {
    this.generalFormStyle$ = this.store.select(selectFormBuilderFormStyles);

    this.generalFormStyle$.subscribe(formStyles => {
      const obj: any = {};

      for (let style of formStyles.styles) {
        obj[style.propName] = style.propValue;
      }

      this.dropSectionStylingForm = this.formBuilder.group({ ...obj });
    });
  }

  public applyStyles(): void {
    const styleModel: FormBuilderFormStyle = new FormBuilderFormStyle();

    for (const formPropName in this.dropSectionStylingForm.value) {
      const formPropValue = this.dropSectionStylingForm.controls[formPropName].value;

      const styleProp = styleModel.styles.find(styleProp => styleProp.propName === formPropName);

      styleProp!.propValue = formPropValue;
    }

    this.store.dispatch(setDropSectionStylesAction({ styleObj: styleModel }));
  }

  public accordionItemClick(accordionItem: CdkAccordionItem, tab: string): void {
    if (tab === this.tabs[0]) {
      this.store.dispatch(loadDropSectionFormStylesAction());
      accordionItem.toggle();
    }
    // if (tab === this.tabs[1] && this.item != null) {
    //   this.store.dispatch(loadDropSectionListItemStylesAction({ item }))
    // }
  }

  public onFormSubmit(form: FormGroup): void {
    this.applyStyles();
  }
}
