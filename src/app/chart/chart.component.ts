import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Chart } from '../../../node_modules/chart.js';
import { ChartConfigService } from '../services/chart-config.service';

@Component({
  selector: 'app-chart',
  template: `
    <div>
      <canvas id='canvas'>{{chart}}</canvas>
    </div>
  `
})
export class ChartComponent implements OnInit, DoCheck {
  chart;
  config;

  @Input() buildingid: number;

  constructor(private chartConfigService: ChartConfigService) {
  }

  ngDoCheck() {
    if (this.chart)
      this.chart.update();
  }
  ngOnInit() {

    this.chartConfigService.getChartConfig(this.buildingid).subscribe(
      data => this.config = data,
      error => console.log(error),
      //() => console.log(this.config)
      () => this.chart = new Chart('canvas', this.config)
    );
  }
}



