import { Component, OnInit, Input } from '@angular/core';
import { ChartDatasetService } from '../services/chart-dataset.service';

@Component({
  selector: 'app-sensor-buttons',
  templateUrl: './sensor-buttons.component.html',
  styleUrls: ['./sensor-buttons.component.scss']
})
export class SensorButtonsComponent implements OnInit {
  buttonData;
  @Input() buildingid;

  constructor(private chartDatasetService: ChartDatasetService) { }

  ngOnInit() {
    console.log("getting the data");
    this.chartDatasetService.getButtonData(this.buildingid)
    .subscribe(
      data =>{
        this.buttonData = data;
        console.log(data);
      },
      error => console.log(error)
    )
  }
  toggle(sensor){
    sensor.hidden = !sensor.hidden;
  }
}


