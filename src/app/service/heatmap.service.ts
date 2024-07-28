import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class HeatmapService {
  private heatmapDataSubject = new BehaviorSubject<number[][]>(this.initializeData());
  heatmapData$ = this.heatmapDataSubject.asObservable();

  private initializeData(): number[][] {
    const data: number[][] = [];
    for (let i = 0; i < 7; i++) {
      const dayData: number[] = [];
      for (let j = 0; j < 52; j++) {  // Assuming 52 weeks in a year
        dayData.push(0);
      }
      data.push(dayData);
    }
    return data;
  }

  updateData(newEvent: { timestamp: Date; intensity: number }) {
    const currentData = this.heatmapDataSubject.value;
    const day = newEvent.timestamp.getDay();
    const week = this.getWeekNumber(newEvent.timestamp);
    currentData[day][week] += newEvent.intensity;
    this.heatmapDataSubject.next(currentData);
  }

  private getWeekNumber(d: Date): number {
    const oneJan = new Date(d.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((d.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((numberOfDays + oneJan.getDay() + 1) / 7);
  }
}
