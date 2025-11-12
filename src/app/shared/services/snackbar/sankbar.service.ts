import { Injectable, inject } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn:'root'})
export class SnackBarService {
    private snackbar = inject(MatSnackBar);

    success(message:string, action ='Close', duration=3000){
        this.snackbar.open(message,action,{
            duration,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
        })
    }

    error(message:string, action ='Close', duration=3000){
        this.snackbar.open(message,action,{
            duration,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
        })
    }
}