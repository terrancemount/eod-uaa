import { Component, OnInit } from '@angular/core';
import { SensorService } from '../services/sensor.service';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  count = 0;
  timer;
  sensorReadings = [];
  constructor(private sensorService:SensorService) { }

  ngOnInit() {
   
  }



}
