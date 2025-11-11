import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SpinnerOverlayComponent } from "@src/app/shared/spinner/spinner-overlay.component";

@Component({
  selector: "app-auth-layout",
  imports: [RouterOutlet, SpinnerOverlayComponent],
  templateUrl: "./auth-layout.component.html",
  standalone: true,

})
export class AuthLayout{}