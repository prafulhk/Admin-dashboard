import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Skeleton } from '../skeleton/skeleton';

import { Card } from '../card/card';

@Component({
  selector: 'app-charts',
  imports: [Card],
  templateUrl: './charts.html',
  styleUrl: './charts.css',
})
export class Charts implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  @Input() chartLabel = '';
  @Input() chartData: number[] = [];
  @Input() chartType: any = 'line';
  @Input() labels: string[] = [];
  isLoading = false;
  private chart: Chart | undefined;

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // If the data changes and the chart already exists, update it
    if (changes['chartData'] && this.chart) {
      this.chart.data.datasets[0].data = this.chartData;
      this.chart.update();
    }
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  private initChart() {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: this.chartType,
      data: {
        labels: this.labels,
        datasets: [
          {
            label: this.chartLabel,
            data: this.chartData,
            borderColor: '#3b82f6',
            backgroundColor:
              this.chartType === 'pie' ? ['#3b82f6', '#10b981', '#f59e0b'] : 'rgba(59,130,246,0.2)',
            fill: this.chartType === 'line',
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
