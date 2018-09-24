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

  @Input() buildingId:number = 1;

  constructor(private sensorService:SensorService) {
  }

  ngDoCheck(){
    if(this.chart)
      this.chart.update();
  }
  ngOnInit() {
   // this.chart = new Chart('canvas', this.initConfig( ));

    // this.sensorService.getSensorReadingArray(this.buildingId, (err, data) => {
    //   if(err) {
    //     console.log('Error when trying to get sensor data');
    //   } else {
    //   }
    // });
  }
}

//   /**
//    * gets the default config for the chart.js object
//    */
//   private initConfig(sensorConfig:[], data:[]) {
//     return {
//       type: 'line',
//       data: {
//         labels:[],
//         datasets: [{
//           id: 1,
//           label: 'Electricty Demand',
//           data:[],
//           borderColor: 'rgb(255, 205, 86)',
//           backgroundColor: 'rgba(255, 205, 86, 0.5)',
//           fill: true,
//           hidden: !this.showElectrical,
//           yAxisID: 1
//         },{
//           id:2,
//           label: 'Natural Gas Demand',
//           data:[],
//           borderColor: 'rgb(255, 99, 132)',
//           backgroundColor: 'rgba(255, 99, 132, 0.5)',
//           hidden: !this.showNaturalGas,
//           fill: true,
//           yAxisID: 2
//         },{
//           id:3,
//           label: 'Outside Temperature',
//           data:[],
//           borderColor: 'rgb(201, 203, 207)',
//           backgroundColor: 'rgb(201, 203, 207)',
//           hidden:!this.showOutsideTemp,
//           fill: false,
//           yAxisID: 3
//         }]
//       },
//       options: {
//         events:['hover'],
//         lineHeight: 1,
//         responsive: true,
//         hover: {
//           mode: 'nearest',
//           intersect: true
//         },
//         stacked: false,
//         title: {
//           display: true,
//           text: 'Engineering and Industry Building Sensor Data'
//         },
//         scales: {
//           yAxes: [{
//             id: 1,
//             position: 'left',
//             display: this.showElectrical,
//             scaleLabel:{
//               display: this.showElectrical,
//               labelString: 'Electrical Demand (KW)'
//             }
//           },{
//             id: 2,
//             position: 'left',
//             display: this.showNaturalGas,
//             scaleLabel:{
//               display: this.showNaturalGas,
//               labelString: 'Natural Gas Demand (CCT)'
//             }
//           },{
//             id: 3,
//             display:this.showOutsideTemp,
//             position: 'right',
//             scaleLabel:{
//               display: this.showOutsideTemp,
//               labelString: 'Outside Temperature (\xB0F)'
//             }
//           }],
//           xAxes: [{
//             ticks: {
//               maxTicksLimit: 10,
//               autoSkip : true,
//               callback: function(value, index, values) {
//                   const dt = new Date(value);
//                   return moment(value).format('ddd h:mm a');
//               }
//             }
//           }]
//         }
//       }
//     };
//   }

// }

// const mockSensorConfig =[{
//     id: 1,
//     label:
//   }
// ]

// const yAxesConfig = [

// ]
