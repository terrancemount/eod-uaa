import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-sensor-buttons',
  templateUrl: './sensor-buttons.component.html',
  styleUrls: ['./sensor-buttons.component.scss']
})
export class SensorButtonsComponent implements OnInit {

  @Input() sensorConfig = [
    {name: 'Electrical Useage', id: 1, hidden: false},
    {name: 'Electrical Demand', id: 2,  hidden: false},
    {name: 'Natural Gas Useage', id: 3, hidden: true},
    {name: 'Natural Gas Useage', id: 4, hidden: true},
    {name: 'Temperature', id: 3, hidden: false}]
  constructor() { }

  ngOnInit() {
  }

  toggle(name){
    
  }
}


