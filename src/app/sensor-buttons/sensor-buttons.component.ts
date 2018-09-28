import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChartDatasetService } from '../services/chart-dataset.service';
import { Router } from '@angular/router';
import { ChartYaxesService } from '../services/chart-yaxes.service';


@Component({
  selector: 'app-sensor-buttons',
  templateUrl: './sensor-buttons.component.html',
  styleUrls: ['./sensor-buttons.component.scss']
})
export class SensorButtonsComponent implements OnInit {

  @Input() config;
  allAxes;
  timer;
  @Output() update = new EventEmitter();
  @Input() buildingid;
  @Input() sensorIndex;

  constructor(private chartDatasetService: ChartDatasetService,
    private chartYaxesService: ChartYaxesService,
    private router: Router) { }

  ngOnInit() {

    this.allAxes = this.chartYaxesService.getAllChartYaxes();
    console.log('config = ', this.config)
  }



  toggle(sensor) {
    //reset the timer
    //this.startTimer();

    if(sensor.hidden){
      this.hideAllButSensors(sensor.id);
      this.update.emit();
    }

  }

  hideAllButSensors(sensorid:number){
    this.config.data.datasets.forEach(sensor => {
      if(sensor.sensorcode === 'temperature'){} //do nothing
      else if(sensorid === sensor.id) {
        sensor.hidden = false;
        this.hideAllButYaxis(sensor.yAxisID);
      } else {
        sensor.hidden = true;
      }
    })
  }

  hideAllButYaxis(yAxes:number){
    let axes = this.config.options.scales.yAxes;

    axes = axes.filter(axis => axis.id === 4);

    axes.push(this.allAxes.find(axis => axis.id === yAxes));

  }
}


