import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn} from '@angular/forms';

interface FieldConfig {
    name: string,
    label: string,
    type: string,
    validation: ValidatorFn[]
}

@Component({
    selector:"form-with-errors",
    standalone:true,
    templateUrl:"./form-with-errors.component.html",
    imports: [ReactiveFormsModule, CommonModule]
})
export class FormWithErrors<T extends Record<string, any> = any> {

    @Input() fields: FieldConfig[]= [];

    @Output() modelChange = new EventEmitter<T>();

    @Output() formReady = new EventEmitter<FormGroup>();

    public form!: FormGroup

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
}