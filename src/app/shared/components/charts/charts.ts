import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Skeleton } from '../skeleton/skeleton';
import { CommonModule } from '@angular/common';
import { Card } from '../card/card';

@Component({
  selector: 'app-charts',
  imports: [CommonModule, Card],
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

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  ngAfterViewInit(): void {
    new Chart(this.chartCanvas.nativeElement, {
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
            tension: this.chartType === 'line' ? 0.3 : 0,
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
