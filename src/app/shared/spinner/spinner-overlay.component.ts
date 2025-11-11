import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '@services/spinner/spinner.service';

@Component({
  selector: 'app-spinner-overlay',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
  template: `
  @if (spinner.loading){
    <div
      class="fixed inset-0 bg-gray-800/30 flex items-center justify-center z-50"
    >
      <mat-spinner diameter="60"></mat-spinner>
    </div>
  }
  `,
})
export class SpinnerOverlayComponent {
  constructor(public spinner: SpinnerService) {}
}
