import { Injectable, inject } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

interface SnackBarOptions {
    duration?: number;
    actionText?: string;
    actionCallback?: () => void;
    panelClass?: string[];
}
class SnackBarBuilder {

    private message: string;
    private type: 'success' | 'error' | 'info';
    private options: SnackBarOptions={};
    private snackBar: MatSnackBar;

    constructor(type:'success' | 'error' | 'info', message: string, snackbar:MatSnackBar) {
        this.type = type;
        this.message =  message;
        this.snackBar =  snackbar;
    }

    duration(ms: number) {
        this.options.duration = ms;
        return this;
    }

    action(text:string, callback?: () => void) {
        this.options.actionText= text;
        this.options.actionCallback = callback;
        return this;
    }

    show() {

        const ref = this.snackBar.open(this.message, this.options.actionText || 'Close',{
            duration: this.options.duration??3000,
            horizontalPosition:"center",
            verticalPosition: "top",
            panelClass: this.options.panelClass || [`${this.type}-snackbar`],
        })
        if( this.options.actionCallback ){
            ref.onAction().subscribe(()=>this.options.actionCallback?.());
        }
    }

}

@Injectable({providedIn:'root'})
export class SnackBarService {
    private snackbar = inject(MatSnackBar);

    success(message:string){
        return new SnackBarBuilder('success', message, this.snackbar)
    }

    error(message:string){
        return new SnackBarBuilder('error', message, this.snackbar)
    }
}