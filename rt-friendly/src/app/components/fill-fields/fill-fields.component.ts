import { Component, OnInit, OnChanges, AfterViewInit, OnDestroy,
         SimpleChanges, Input, Output, EventEmitter, ContentChildren, TemplateRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ExtraType } from 'src/app/models/extra-types.model';

interface FillField {
  key: string;
  name: string;
  type: string;
  value: any;
  extra: boolean;
  show: boolean;
  notRequired?: boolean;
  options?: { value: any, name: string }[];
}

@Component({
  selector: 'app-fill-fields',
  templateUrl: './fill-fields.component.html',
  styleUrls: ['./fill-fields.component.scss']
})
export class FillFieldsComponent implements OnInit, OnChanges {
  // Form to be filled
  form = new FormGroup({
    standard: new FormGroup({}),
    extra: new FormGroup({})
  });

  // Indicates if any extra field exists
  extraFields = false;

  // Related to ExtraType model uses' in the templates
  // Local declaration of ExtraType model to avoid erros when using it on the html
  extraType: any = ExtraType;

  @Input() title: any = null;

  // Fields to be filled
  @Input() fields: FillField[] = [];

  // Flag that indicates if the card with the fields are visible
  @Input() visible: any = false;

  // Flag that indicates if confirm/cancel buttons should be used
  @Input() showButtons: any = true;

  @Input() formGroupContent: any = null;

  // Flag that indicates if the standard margin/padding should be used
  @Input() cardMargin: any = true;

  // Text of submitButton
  @Input() submitButton: any = null;

  // Replaces 'cancel' button with a button that clean all fields
  @Input() cleanButton = false;

  // Indicates if form fields need to be clean after a submit
  @Input() cleanOnSubmit = false;

  @Input() numberOfColumns = 3;

  // Boolean used to indicate if a mat-form-field template is passed as parameter to content projection
  // It's used to prevent unintended margin's
  @Input() fieldParam = false;

  @Input() fieldParamPosition = 'top';

  @Input() customHeight: any = null;

  @Input() customGutter: any = null;

  @Input() loadingButton = false;

  @Input() loadingFlag = false;

  @Output() formResponse  = new EventEmitter();

  @Output() inputChange  = new EventEmitter();

  @Output() switchView = new EventEmitter();

  @Output() invalidFormsSubmit = new EventEmitter();

  constructor(
   ) { }

  ngOnInit() {
    this.form = new FormGroup({
      standard: new FormGroup({}),
      extra: new FormGroup({})
    });

    // Setting fields
    if (this.fields) {
      this.fields.forEach( (field) => {
        // Standard fields
        if (!field.extra) {
          (this.form.get('standard') as FormGroup).addControl(field.key, new FormControl((field.value)) );
          if (!field.notRequired) {
            this.form.controls['standard']?.get(field.key)?.setValidators(Validators.required);
          }
        // Extra fields
        } else {
          this.extraFields = true;
          (this.form.get('extra') as FormGroup).addControl(field.key, new FormControl((field.value)) );
          if (!field.notRequired) {
            this.form.controls['extra']?.get(field.key)?.setValidators(Validators.required);
          }
        }
      });

      if (!this.extraFields) {
        this.form.removeControl('extra');
        this.extraFields = false;
      }
    }

    if (this.formGroupContent) {
      this.form.addControl('content', this.formGroupContent);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.fields || changes.formGroupContent) {
      this.ngOnInit();
    }
  }

  sendForms() {
    this.form.markAllAsTouched();

    if (this.form.valid && this.fields) {
      const body = this.form.value.standard;

      if (this.extraFields) {
        body.extra = this.form.value.extra;
      }

      this.formResponse.emit( {
        body: this.copyObject(body),
        content: this.form.value.content ? this.form.value.content : null,
        callback: this.cleanFields.bind(this),
      });

      if (this.cleanOnSubmit) {
        this.form.reset();
      }
    } else {
      this.invalidFormsSubmit.emit(true);
    }
  }

  switchViewing() {
    this.switchView.emit(false);
  }

  // Returns a deep copy (includes objects inside other objects) of a object
  copyObject(obj: any) {
    return  (obj ? JSON.parse(JSON.stringify(obj)) : obj);
  }

  cleanFields() {
    this.form.reset();

    this.switchViewing();
  }

  fieldChangeEmitter(field: any) {
    if (field && field.checkChanges) {
      this.inputChange.emit(this.form.value);
    }
  }

  getType(element: any) {
    return typeof element;
  }
}
