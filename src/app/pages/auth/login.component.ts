import { Component, inject } from "@angular/core";
import { FormWithErrors } from "@shared/forms/form-with-errors.component";
import { Validators , FormGroup , ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { NgClass } from "@angular/common";
import { AuthService } from "@services/auth.service";
import { LoginRequest, LoginResponse } from "@services/users/user.interface"
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerService } from "@src/app/shared/services/spinner/spinner.service";
import {SnackBarService} from '@shared/services/snackbar/sankbar.service';
import { Router } from '@angular/router';


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
            validation: [Validators.required]
        }
    ];
    
    public user: LoginRequest = {
        email:'',
        password:''
    };


    private authService =  inject(AuthService);

    private snackbar = inject(SnackBarService);

    private router =  inject(Router)

    onChange(event: LoginRequest) {        
        this.user= event;
    }

    login() {
        this.spinner.show()
        this.authService.login(this.user).subscribe({
            next: (res: LoginResponse) => {
                this.spinner.hide();
                this.snackbar.success('LoggedIn Successfully');
                localStorage.setItem('access_token',res?.access_token)
                localStorage.setItem('user',JSON.stringify(res?.user))
                this.router.navigate(['/'])
            },
            error: (res)=> {                
                this.spinner.hide();
                this.snackbar.error(res.error.message);
            }
        })
    }

    ngOnInit() {
        this.form =  this.formBuilder.group({});
    }
}