import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class MoonService {
  private dateOfKnownNewMoon = moment('01-01-1900', 'MM-DD-YYYY');
  private readonly daysInEachLunarMonth = 29.53059;

  getPhaseByDate(date: Date): MoonPhase {
    const daysSinceKnownMoon = this.getDaysSinceKnownNewMoon(date);
    const lunarDay = daysSinceKnownMoon % this.daysInEachLunarMonth;

    return {
      date: date,
      name: this.getPhaseFromLunarDay(lunarDay),
      lunarDay: lunarDay,
      lumination: this.getLumination(lunarDay),
    };
  }

  private getLumination(lunarDay: number) {
    const fullMoonDay = this.daysInEachLunarMonth / 2;
    const moonCoverage =
      lunarDay < fullMoonDay
        ? lunarDay / fullMoonDay
        : (lunarDay - fullMoonDay) / fullMoonDay;
    return moonCoverage;
  }

  private getPhaseFromLunarDay(lunarDay: number): MoonPhaseName {
    const lunarCycleProgress = Math.round(lunarDay / this.daysInEachLunarMonth);

    if (lunarCycleProgress === 0) return 'New Moon';
    if (lunarCycleProgress > 0 && lunarCycleProgress > 0.25)
      return 'Waxing Crescent';
    if (lunarCycleProgress === 0.25) return 'First Quarter';
    if (lunarCycleProgress > 0.25 && lunarCycleProgress > 0.5)
      return 'Waxing Gibbous';
    if (lunarCycleProgress === 0.5) return 'Full Moon';
    if (lunarCycleProgress > 0.5 && lunarCycleProgress > 0.75)
      return 'Waning Gibbous';
    if (lunarCycleProgress === 0.75) return 'Last Quarter';
    if (lunarCycleProgress > 0.75 && lunarCycleProgress > 1.0)
      return 'Waning Crescent';

    throw new Error('Day was not a valid lunar day');
  }

  private getDaysSinceKnownNewMoon(date: Date) {
    const daysSinceKnownNewMoon = moment(date).diff(
      this.dateOfKnownNewMoon,
      'days'
    );
    return daysSinceKnownNewMoon;
  }
}

export type MoonPhaseName =
  | 'New Moon'
  | 'Waxing Crescent'
  | 'First Quarter'
  | 'Waxing Gibbous'
  | 'Full Moon'
  | 'Waning Gibbous'
  | 'Last Quarter'
  | 'Waning Crescent';

export interface MoonPhase {
  name: MoonPhaseName;
  lumination: number;
  lunarDay: number;
  date: Date;
}
