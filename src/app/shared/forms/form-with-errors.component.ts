import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, FormControl, FormGroupDirective, NgForm } from '@angular/forms';

interface FieldConfig {
    name: string,
    label: string,
    type: string,
    validation: ValidatorFn[]
}
interface FieldError {
    key: string;
    message: string;
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
    selector:"form-with-errors",
    standalone:true,
    templateUrl:"./form-with-errors.component.html",
    imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule]
})
export class FormWithErrors<T extends Record<string, any> = any> {

    @Input() fields: FieldConfig[]= [];

    @Output() modelChange = new EventEmitter<T>();

    @Output() formReady = new EventEmitter<FormGroup>();

    public form!: FormGroup
    public matcher = new MyErrorStateMatcher();

    private formBuilder: FormBuilder = inject(FormBuilder)

    ngOnInit() {
        const controls : Record<string, any> = {}
        for( const field of this.fields ) {
            controls[field.name] = [null, field.validation || []];
        }        
        this.form =  this.formBuilder.group(controls);
        this.formReady.emit(this.form);   
        this.form.valueChanges.subscribe((value)=>{
            return this.modelChange.emit(value)
        })
    }

    getErrors(controlName: string): FieldError[] {
        const control = this.form.get(controlName);
        if (!control || !control.errors) return [];
        
        const errors: FieldError[] = [];

        for (const key of Object.keys(control.errors)) {
            if (key === 'server') {
                errors.push({ key, message: control.errors[key] });
            } else {
                errors.push({
                    key,
                    message: this.getErrorMessage(controlName, key, control.errors[key])
                });
            }
        }

        return errors;
    }

    private getErrorMessage(label: string, errorKey: string, errorValue: any): string {
        const messages: Record<string, string> = {
            required: `${label} is required.`,
            email: `Please enter a valid email address.`,
            minlength: `${label} is too short. Minimum length is ${errorValue?.requiredLength}.`,
            maxlength: `${label} is too long. Maximum length is ${errorValue?.requiredLength}.`
        };
        return messages[errorKey] || `${label} is invalid.`;
    }
}