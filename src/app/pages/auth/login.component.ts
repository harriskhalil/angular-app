import { Component, inject } from "@angular/core";
import { FormWithErrors } from "@shared/forms/form-with-errors.component";
import { Validators , FormGroup , ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { NgClass } from "@angular/common";
import { AuthService } from "@services/auth.service";
import { LoginRequest } from "@services/users/user.interface"
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerService } from "@services/spinner/spinner.service";


@Component({
    selector:'auth-login',
    templateUrl: "./login.component.html",
    standalone:true,
    imports: [FormWithErrors, ReactiveFormsModule, NgClass, MatProgressSpinnerModule]
})

export class Login {
    
    public form!: FormGroup;

    private formBuilder = inject(FormBuilder);

    private spinner = inject(SpinnerService);

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
    
    public user: LoginRequest = {
        email:'',
        password:''
    };


    private authService =  inject(AuthService);

    onChange(event: LoginRequest) {        
        this.user= event;
    }

    login() {
        this.spinner.show()
        console.log(this.user);
        // this.authService.login(this.user).subscribe({
        //     next: (res) => {
        //         console.log(res);
        //     },
        //     error: (res)=>{
                
        //     }
        // })
    }

    ngOnInit() {
        this.form =  this.formBuilder.group({});
    }
}