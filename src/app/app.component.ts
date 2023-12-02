import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MoonService } from './moon.service';
import { MoonPhaseComponent } from './moon-phase/moon-phase.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MoonPhaseComponent],
  template: `
    <div class="page bg-slate-900 text-slate-200 flex flex-col">
      <div class="mt-5 max-w-6xl mx-auto w-full">
        <h1 class="text-xl font-semibold mb-4">NBA Lunar</h1>
        <div class="grid grid-cols-3 gap-4">
          <app-moon-phase [moonPhase]="moonPhase1" />
          <app-moon-phase [moonPhase]="moonPhase2" />
          <app-moon-phase [moonPhase]="moonPhase3" />
          <app-moon-phase [moonPhase]="moonPhase4" />
          <app-moon-phase [moonPhase]="moonPhase5" />
          <app-moon-phase [moonPhase]="moonPhase6" />
        </div>
      </div>
    </div>
  `,
  styles: `
    .page {
      @apply min-h-screen min-w-full max-h-screen max-w-full overflow-hidden;
    }
  `,
})
export class AppComponent {
  private moonService = inject(MoonService);

  moonPhase1 = this.moonService.getPhaseByDate(new Date());
  moonPhase2 = this.moonService.getPhaseByDate(new Date(2000, 0, 1));
  moonPhase3 = this.moonService.getPhaseByDate(new Date(1900, 0, 1));
  moonPhase4 = this.moonService.getPhaseByDate(new Date(1995, 2, 1));
  moonPhase5 = this.moonService.getPhaseByDate(new Date(1994, 11, 6));
  moonPhase6 = this.moonService.getPhaseByDate(new Date(2013, 11, 6));
}
