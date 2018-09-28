import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Chart } from '../../../node_modules/chart.js';
import { ChartConfigService } from '../services/chart-config.service';
import { BuildingService } from '../services/building.service';
import { Router } from '@angular/router';


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
  allAxes;
  timer;
  @Input() sensorIndex = 1;
  @Input() isTimed = true;



  buildingid: number = 31;

  constructor(private chartConfigService: ChartConfigService, private buildingService: BuildingService, private router: Router) { }


  ngDoCheck() {
    if (!this.isTimed) {
      this.hideAllButSensors(this.sensorIndex);
    }
    this.update();

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
    if (this.isTimed) {
      this.startTimer();
    }
  }

  update() {
    if (this.chart)
      this.chart.update();
  }



  startTimer() {
    //clear old timer if present
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.router.navigate(['carousel']);
    }, 1 * 60 * 1000) //two minute timeout if someone presses it
  }


  toggle(sensor) {
    //reset the timer
    this.startTimer();

    if (sensor.hidden) {
      this.hideAllButSensors(sensor.id);
    }

  }

  hideAllButSensors(sensorid: number) {
    if (this.chart) {
      this.config.data.datasets.forEach(sensor => {
        if (sensor.sensorcode === 'temperature') { } //do nothing
        else if (sensorid === sensor.id) {
          sensor.hidden = false;
          this.hideAllButYaxis(sensor.yAxisID);
        } else {
          sensor.hidden = true;
        }
      })
    }
  }

  hideAllButYaxis(yAxesID: number) {
    this.config.options.scales.yAxes.forEach(axis => {
      if (axis.id === 4) { } //do nothing to temperature
      else if (axis.id === yAxesID) {
        axis.display = true;
      } else {
        axis.display = false;
      }
    })
  }
}



