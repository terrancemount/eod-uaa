import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Chart } from '../../../../node_modules/chart.js';
import { ChartConfigService } from '../../services/chart-config.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit {
  chart; //holds the chart object
  height;
  width;
  timer;
  route;
  @Input() isTimed = true; //default is true.  Used when this is routed to rather then a child component.
  @Input() buildingid: number = 31; //31 is the default bing now default building

  constructor(private chartConfigService: ChartConfigService,
    private cdr: ChangeDetectorRef,
    private router: Router) { }


  ngOnInit() {
    this.setupChart();

    this.route = this.router.url;
    //timer to call setup every 15 minutes.
    setInterval(()=>{
      this.setupChart();
    }, 15 * 60 * 1000);

    //Default is yes, A parent has to specify false for this not to be timed.
    if (this.isTimed) {
      this.startTimer();
    }

    this.cdr.detectChanges();
  }

  /**
   * Gets the data from the ChartConfigService then displays the chart;
   */
  setupChart(){
    let config; //local var to hold the config until chart gets it.
    this.chartConfigService.getChartConfig(this.buildingid).subscribe(
      data => config = data,
      error => console.log(error),
      () => {


        this.chart = new Chart('canvas', config)
        this.cdr.detectChanges();
      }
    );
  }

  /**
   * Starts a timer whenever the dashboard is first loaded or restarts
   * when a user presses a button.
   */
  private startTimer() {
    //clear old timer if present
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.router.navigate(['carousel']);
    }, 1 * 60 * 1000) //two minute timeout if someone presses it
  }

  /**
   * Turns on the sepecified sensor object. Used by this being a route rather then a child.
   * @param {object} sensor a reference to the datasets object in the chart object
   * @return null
   */
  turnOn(sensor) {
    //reset the timer
    this.startTimer();

    if (sensor.hidden || sensor.sensorcode === 'temperature') {
      this.hideAllButSensor(sensor.id);
    }
  }

  /**
   * Shows the sensor basied off id.  Used by a parent. Will update chart after.
   * @param id a number representing the id of the sensor to display
   */
  showSensor(id){
    //make sure the chart is ready
    if(this.chart){
      const sensor = this.chart.config.data.datasets.find(s => s.id === id);

      if(sensor.hidden){
        this.hideAllButSensor(sensor.id);
      }
    }
  }

  /**
   * Show only the specified sensor id and the temperature graphs.
   * This function call hideAllbutYAxis to hide the uneeded yAxes.
   * This will cause a chart update to happen after all sensors have been set.
   * @param sensorid a number representing the sensor in the chart object
   */
  private hideAllButSensor(sensorid: number) {
    if (this.chart) {
      this.chart.config.data.datasets.forEach(sensor => {
        if(sensor.sensorcode === 'temperature'){
          if(sensorid === sensor.id){
            this.hideAllButYaxis(sensor.yAxisID);
          }
        }
        else if (sensorid === sensor.id) {
          sensor.hidden = false;
          this.hideAllButYaxis(sensor.yAxisID);
        } else {
          sensor.hidden = true;
        }
      });

      //after everything has been set then update the chart
      this.chart.update();
      this.cdr.detectChanges();
    }
  }

  /**
   * Shows the specified yAxis and the yAxis for temperature.
   * This does not call for chart update, the update should happen in
   * hideAllButSensor
   * @param yAxesID the yAxes to be shown.
   */
  private hideAllButYaxis(yAxesID: number) {
    this.chart.config.options.scales.yAxes.forEach(axis => {
      if (axis.id === 4) {} //do nothing to temperature
      else if (axis.id === yAxesID) {
        axis.display = true;
      } else {
        axis.display = false;
      }
    })
  }
}



