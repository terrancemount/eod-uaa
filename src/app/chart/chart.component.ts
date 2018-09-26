import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Chart } from '../../../node_modules/chart.js';
import { ChartConfigService } from '../services/chart-config.service';
import { BuildingService } from '../services/building.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, DoCheck {
  chart;
  config;
  height;
  width;
  building;


  @Input() buildingid: number;

  constructor(private chartConfigService: ChartConfigService, private buildingService: BuildingService) {}


  ngDoCheck() {
    if (this.chart)
      this.chart.update();
  }
  ngOnInit() {

    //gets the building object to pull the name out of.
    this.buildingService.getBuilding(this.buildingid)
    .subscribe(
      data => this.building = data,
      error => console.log(error)
    )

    this.chartConfigService.getChartConfig(this.buildingid).subscribe(
      data => this.config = data,
      error => console.log(error),
      //() => console.log(this.config)
      () => {

        this.height = window.innerHeight * .70;
        this.width = window.innerWidth * .90

        this.chart = new Chart('canvas', this.config)
      }
    );
  }
}



