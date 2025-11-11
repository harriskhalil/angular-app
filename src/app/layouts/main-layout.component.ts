import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerOverlayComponent } from '@shared/spinner/spinner-overlay.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SpinnerOverlayComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayout {}
