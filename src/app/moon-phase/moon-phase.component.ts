import { Component, Input } from '@angular/core';
import { MoonPhase } from '../moon.service';
import { DatePipe, DecimalPipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'app-moon-phase',
  standalone: true,
  imports: [DatePipe, PercentPipe, DecimalPipe],
  template: `
    <div class="border border-slate-700 bg-slate-900 shadow-md rounded-md p-3">
      <div class="flex justify-between">
        <span>Name:</span>
        <span>{{ moonPhase.name }}</span>
      </div>

      <div class="flex justify-between">
        <span>Date:</span>
        <span>{{ moonPhase.date | date : 'mediumDate' }}</span>
      </div>

      <div class="flex justify-between">
        <span>Lumination:</span>
        <span>{{ moonPhase.lumination | percent }}</span>
      </div>

      <div class="flex justify-between">
        <span>Lunar Day:</span>
        <span>{{ moonPhase.lunarDay | number : '1.0-0' }}</span>
      </div>
    </div>
  `,
})
export class MoonPhaseComponent {
  @Input({ required: true }) moonPhase!: MoonPhase;
}
