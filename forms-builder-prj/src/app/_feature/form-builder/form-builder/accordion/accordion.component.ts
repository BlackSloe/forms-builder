import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormBuilderStyle } from 'src/app/_models/form-builder-style';
import { setDropSectionStylesAction } from 'src/app/_store/actions/form-builder.actions';
import { AppState } from 'src/app/_store/app.states';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {
  public tabs: string[] = ['Form General Styling', 'Field Styling'];
  expandedIndex = 0;
  
  dropSectionStylingForm: FormGroup;

  constructor(private store: Store<AppState>,
    private formBuilder: FormBuilder) {

    this.dropSectionStylingForm = this.formBuilder.group({
      minWidth: [''],
      height: [''],
      borderWidth: [''],
      borderStyle: [''],
      borderColor: ['']
    });
  }

  ngOnInit(): void {

  }

  public applyStyles(): void {
    const styleModel: FormBuilderStyle = new FormBuilderStyle();

    for(let formPropName in this.dropSectionStylingForm.value) {
      const formPropValue = this.dropSectionStylingForm.controls[formPropName].value;

      const styleProp = styleModel.styles.find(styleProp => styleProp.propName == formPropName);

      styleProp!.propValue = formPropValue;
    }

    this.store.dispatch(setDropSectionStylesAction({ styleObj: styleModel }));
  }
}
