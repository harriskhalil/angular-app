import { Component, inject } from "@angular/core";
import { FormWithErrors } from "../../shared/forms/form-with-errors.component";
import { Validators , FormGroup , ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { NgClass } from "@angular/common";


interface User {
    email: string,
    password?: string,
}

@Component({
    selector:'auth-login',
    templateUrl: "./login.component.html",
    standalone:true,
    imports: [FormWithErrors, ReactiveFormsModule, NgClass]
})

export class Login {
    
    public form!: FormGroup;

    private formBuilder = inject(FormBuilder);

    public fields = [
        {
            name: "email",
            label: "Email",
            type: "input",
            validation: [Validators.required, Validators.email]
        },
        {
            name: "password",
            label: "Password",
            type: "input",
            validation: [Validators.required, Validators.minLength(8)]
        }
    ];
    
    public user: User = {
        email:'',
        password:''
    };


    onChange(event: User) {        
        this.user= event;
    }

    login (){
        console.log(this.user);  
    }

    ngOnInit() {
        this.form =  this.formBuilder.group({});
    }
}