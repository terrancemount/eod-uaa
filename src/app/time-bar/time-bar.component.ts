import { Component, OnInit } from '@angular/core';
import { SensorService } from '../services/sensor.service';

@Component({
  selector: 'app-time-bar',
  templateUrl: './time-bar.component.html',
  styleUrls: ['./time-bar.component.scss']
})
export class TimeBarComponent implements OnInit {
  temperature:number[];
  now:number;

  constructor(private sensorService: SensorService) {
    setInterval(()=> {
      this.now = Date.now();
    }, 60 * 1000);
  }

  ngOnInit() {

  }

}
