import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AccordionMenuItem } from 'src/app/_models/accordion-menu-item';
import { FormBuilderStyle } from 'src/app/_models/form-builder-style';
import { loadDropSectionStylesAction } from 'src/app/_store/actions/form-builder.actions';
import { AppState } from 'src/app/_store/app.states';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {
  items: string[] = ['Form General Styling', 'Field Styling'];
  expandedIndex = 0;
  
  dropSectionStylingForm: FormGroup;

  constructor(private store: Store<AppState>,
    private formBuilder: FormBuilder) {

    this.dropSectionStylingForm = this.formBuilder.group({
      width: ['auto']
    });
  }

  ngOnInit(): void {

  }

  public applyStyles(): void {
    const styleObj: FormBuilderStyle = { ...this.dropSectionStylingForm.value };
    this.store.dispatch(loadDropSectionStylesAction({ styleObj }));
  }
}
