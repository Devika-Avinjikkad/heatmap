import { Component, OnInit } from '@angular/core';
import { HeatmapService } from '../../service/heatmap.service';
import { heatMockData } from '../../data/heatmap.mock';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrl: './heatmap.component.scss'
})
export class HeatmapComponent implements OnInit {
  heatmapData: number[][] = [];
  heatData=heatMockData

  constructor(private heatmapService: HeatmapService) {}

  ngOnInit(): void {
    let index = 0;
      while (index < this.heatData.length) {
        const newEvent = this.heatData[index];
        this.heatmapService.updateData(newEvent);
        index++;
      }
    this.heatmapService.heatmapData$.subscribe(data => {
      this.heatmapData = data;
    });
  }

  getColor(intensity: number): string {
    const colors = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];
    if (intensity > 4) return colors[4];
    return colors[intensity];
  }
}
