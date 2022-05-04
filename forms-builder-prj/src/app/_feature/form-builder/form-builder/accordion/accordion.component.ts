import { CdkAccordionItem } from '@angular/cdk/accordion';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccordionTabs as Tabs } from 'src/app/_enums/accordion-tabs';
import { FormBuilderFormStyle } from 'src/app/_models/form-builder-form-style';
import { FormBuilderFormStyleProperty } from 'src/app/_models/form-builder-form-style-property';
import { DraggableItemStyles } from 'src/app/_models/draggable-item-styles';
import {
  loadDropSectionFormStylesAction,
  loadDropSectionListItemStylesAction,
  setDropSectionListItemStylesAction,
  setDropSectionStylesAction
} from 'src/app/_store/actions/form-builder.actions';
import { AppState } from 'src/app/_store/app.states';
import { selectDraggableItemStyles, selectFormBuilderFormStyles } from 'src/app/_store/selectors/form-builder.selectors';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionComponent implements OnInit {
  public dragDropFormBuilderStyle$: Observable<FormBuilderFormStyle>;
  public dragDropListItemStyle$: Observable<DraggableItemStyles>;

  public tabs: string[] = [Tabs.FORM_GENERAL_STYILING, Tabs.FIELD_STYILING];

  public selectedTab: string;

  public expandedIndex = 0;

  public dragDropFormGroup: FormGroup;
  public dragDropListItemFormGroup: FormGroup;

  public model: FormBuilderFormStyleProperty[] = [];

  constructor(private store: Store<AppState>,
    public formBuilder: FormBuilder) {
  }

  public get currentFormGroup(): FormGroup {
    return this.selectedTab === Tabs.FORM_GENERAL_STYILING ?
      this.dragDropFormGroup : this.dragDropListItemFormGroup
  }

  public get currentStyles$(): Observable<FormBuilderFormStyle> | Observable<DraggableItemStyles> {
    return this.selectedTab === Tabs.FORM_GENERAL_STYILING ?
      this.dragDropFormBuilderStyle$ : this.dragDropListItemStyle$;
  }

  ngOnInit(): void {
    this.dragDropFormBuilderStyle$ = this.store.select(selectFormBuilderFormStyles);

    this.dragDropListItemStyle$ = this.store.select(selectDraggableItemStyles);

    this.dragDropListItemStyle$.subscribe(inputStyle => {
      this.dragDropListItemFormGroup = this.formBuilder.group({ ...this.mapModelToObject(inputStyle?.styles)  });
    });

    this.dragDropFormBuilderStyle$.subscribe(formStyles => {
      this.dragDropFormGroup = this.formBuilder.group({ ...this.mapModelToObject(formStyles.styles) });
    });
  }

  private mapModelToObject(styles: FormBuilderFormStyleProperty[]): any {
    if (!styles) {
      return undefined;
    }

    const stylesKeyValue: any = {};

    for (const style of styles) {
      stylesKeyValue[style.propName] = style.propValue;
    }

    // for(const arg of args) {
    //   stylesKeyValue[arg.propName] = arg.propValue
    // }
    return stylesKeyValue;
  }

  public accordionItemClick(accordionItem: CdkAccordionItem, tab: string): void {
    if (tab === Tabs.FORM_GENERAL_STYILING) {
      this.store.dispatch(loadDropSectionFormStylesAction());
    }

    if (tab === Tabs.FIELD_STYILING) {
      this.store.dispatch(loadDropSectionListItemStylesAction());

      if (Object.keys(this.dragDropListItemFormGroup.controls).length === 0) {
        return;
      }
    }

    this.selectedTab = tab;

    accordionItem.toggle();
  }

  public onFormSubmit(form: FormGroup): void {
    if (this.selectedTab === Tabs.FORM_GENERAL_STYILING) {
      const styleModel: FormBuilderFormStyle = new FormBuilderFormStyle();

      this.setStyles(styleModel.styles, form);

      this.store.dispatch(setDropSectionStylesAction({ styles: styleModel }));
    } else if (this.selectedTab === Tabs.FIELD_STYILING) {
      const styleModel: DraggableItemStyles = new DraggableItemStyles();

      this.setStyles(styleModel.styles, form);

      this.store.dispatch(setDropSectionListItemStylesAction({ styles: styleModel }));
    }
  }

  private setStyles(styles: FormBuilderFormStyleProperty[], form: FormGroup): void {
    for (const formPropName in form.value) {
      const formPropValue = form.controls[formPropName].value;

      const styleProp = styles.find(styleProp => styleProp.propName === formPropName);

      styleProp!.propValue = formPropValue;
    }
  }
}
