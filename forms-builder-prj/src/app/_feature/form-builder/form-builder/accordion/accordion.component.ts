import { CdkAccordionItem } from '@angular/cdk/accordion';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccordionTabs as Tabs } from 'src/app/_enums/accordion-tabs';
import { FormBuilderFormStyles } from 'src/app/_models/form-builder-form-styles';
import { FormBuilderStyleProperty } from 'src/app/_models/form-builder-style-property';
import { DraggableItemStyles } from 'src/app/_models/draggable/draggable-item-styles';
import {
  loadDropSectionFormStylesAction,
  loadDraggableItemStylesAction,
  setDropSectionStylesAction,
  setSelectedDraggableItemStylesAction
} from 'src/app/_store/actions/form-builder.actions';
import { AppState } from 'src/app/_store/app.states';
import {
  selectDraggableItemStyles,
  selectFormBuilderFormStyles
} from 'src/app/_store/selectors/form-builder.selectors';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionComponent implements OnInit {
  public readonly tabs: string[] = [Tabs.FORM_GENERAL_STYILING, Tabs.FIELD_STYILING];

  public formBuilderFormStyles$: Observable<FormBuilderFormStyles>;
  public draggableItemStyles$: Observable<DraggableItemStyles>;

  public selectedTab: string;

  public expandedIndex = 0;

  public dragDropFormGroup: FormGroup;
  public dragDropListItemFormGroup: FormGroup;

  public model: FormBuilderStyleProperty[] = [];

  constructor(private store: Store<AppState>,
    public formBuilder: FormBuilder) {
  }

  public get currentFormGroup(): FormGroup {
    return this.selectedTab === Tabs.FORM_GENERAL_STYILING ?
      this.dragDropFormGroup : this.dragDropListItemFormGroup
  }

  public get currentStyles$(): Observable<FormBuilderFormStyles> | Observable<DraggableItemStyles> {
    return this.selectedTab === Tabs.FORM_GENERAL_STYILING ?
      this.formBuilderFormStyles$ : this.draggableItemStyles$;
  }

  ngOnInit(): void {
    this.formBuilderFormStyles$ = this.store.select(selectFormBuilderFormStyles);

    this.draggableItemStyles$ = this.store.select(selectDraggableItemStyles);

    this.draggableItemStyles$.subscribe(inputStyle => {
      this.dragDropListItemFormGroup = this.formBuilder.group({ ...this.mapModelToObject(inputStyle?.styles) });
    });

    this.formBuilderFormStyles$.subscribe(formStyles => {
      this.dragDropFormGroup = this.formBuilder.group({ ...this.mapModelToObject(formStyles.styles) });
    });
  }

  private mapModelToObject(styles: FormBuilderStyleProperty[]): any {
    if (!styles) {
      return undefined;
    }
    const stylesKeyValue: any = {};

    for (const style of styles) {
      stylesKeyValue[style.propName] = style.propValue;
    }

    return stylesKeyValue;
  }

  public accordionItemClick(accordionItem: CdkAccordionItem, tab: string): void {
    if (tab === Tabs.FORM_GENERAL_STYILING) {
      this.store.dispatch(loadDropSectionFormStylesAction());
    }

    if (tab === Tabs.FIELD_STYILING) {
      this.store.dispatch(loadDraggableItemStylesAction());

      if (Object.keys(this.dragDropListItemFormGroup.controls).length === 0) {
        return;
      }
    }

    this.selectedTab = tab;

    accordionItem.toggle();
  }

  public onFormSubmit(form: FormGroup): void {
    if (this.selectedTab === Tabs.FORM_GENERAL_STYILING) {
      const styleModel: FormBuilderFormStyles = new FormBuilderFormStyles();

      this.setStyles(styleModel.styles, form);

      this.store.dispatch(setDropSectionStylesAction({ styles: styleModel }));
    } else if (this.selectedTab === Tabs.FIELD_STYILING) {
      const styleModel: DraggableItemStyles = new DraggableItemStyles();

      this.setStyles(styleModel.styles, form);

      this.store.dispatch(setSelectedDraggableItemStylesAction({ styles: styleModel }));
    }
  }

  private setStyles(styles: FormBuilderStyleProperty[], form: FormGroup): void {
    for (const formPropName in form.value) {
      const formPropValue = form.controls[formPropName].value;

      const styleProp = styles.find(styleProp => styleProp.propName === formPropName);

      styleProp!.propValue = formPropValue;
    }
  }
}
