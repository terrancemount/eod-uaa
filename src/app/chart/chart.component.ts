import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { SensorService } from '../services/sensor.service';
import * as moment from 'moment';
import { Chart } from '../../../node_modules/chart.js';

@Component({
  selector: 'app-chart',
  template: `
    <div>
      <canvas id='canvas'>{{chart}}</canvas>
    </div>
  `
})
export class ChartComponent implements OnInit, DoCheck{
  chart;
  config;


  @Input() showElectrical:boolean = true;
  @Input() showNaturalGas:boolean = false;
  @Input() showOutsideTemp:boolean = true;
  @Input() buildingId:number = 4;

  constructor(private sensorService:SensorService) {
  }

  ngDoCheck(){
    if(this.chart)
      this.chart.update();
  }
  ngOnInit() {
    this.chart = new Chart('canvas', this.getConfig());

    this.sensorService.getSensorReadingArray(this.buildingId, (err, data) => {
      if(err) {
        console.log('Error when trying to get sensor data');
      } else {
        this.chart.config.data.labels = data[0];
        this.chart.config.data.datasets[0].data = data[1];
        this.chart.config.data.datasets[1].data = data[2];
        this.chart.config.data.datasets[2].data = data[3];
        this.chart.update();
      }
    });
  }


  /**
   * gets the default config for the chart.js object
   */
  private getConfig() {
    return {
      type: 'line',
      data: {
        labels:[],
        datasets: [{
          label: 'Electricty Demand',
          data:[],
          borderColor: 'rgb(255, 205, 86)',
          backgroundColor: 'rgba(255, 205, 86, 0.5)',
          fill: true,
          hidden: !this.showElectrical,
          yAxisID: 1
        },{
          label: 'Natural Gas Demand',
          data:[],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          hidden: !this.showNaturalGas,
          fill: true,
          yAxisID: 2
        },{
          label: 'Outside Temperature',
          data:[],
          borderColor: 'rgb(201, 203, 207)',
          backgroundColor: 'rgb(201, 203, 207)',
          hidden:!this.showOutsideTemp,
          fill: false,
          yAxisID: 3
        }]
      },
      options: {
        events:['hover'],
        lineHeight: 1,
        responsive: true,
        hover: {
          mode: 'nearest',
          intersect: true
        },
        stacked: false,
        title: {
          display: true,
          text: 'Engineering and Industry Building Sensor Data'
        },
        scales: {
          yAxes: [{
            id: 1,
            position: 'left',
            display: this.showElectrical,
            scaleLabel:{
              display: this.showElectrical,
              labelString: 'Electrical Demand (KW)'
            }
          },{
            id: 2,
            position: 'left',
            display: this.showNaturalGas,
            scaleLabel:{
              display: this.showNaturalGas,
              labelString: 'Natural Gas Demand (CCT)'
            }
          },{
            id: 3,
            display:this.showOutsideTemp,
            position: 'right',
            scaleLabel:{
              display: this.showOutsideTemp,
              labelString: 'Outside Temperature (\xB0F)'
            }
          }],
          xAxes: [{
            ticks: {
              maxTicksLimit: 10,
              autoSkip : true,
              callback: function(value, index, values) {
                  const dt = new Date(value);
                  return moment(value).format('ddd h:mm a');
              }
            }
          }]
        }
      }
    };
  }

}
