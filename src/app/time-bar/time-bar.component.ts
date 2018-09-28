import { Component, OnInit, DoCheck } from '@angular/core';
import { ChartDataService } from '../services/chart-data.service';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-time-bar',
  templateUrl: './time-bar.component.html',
  styleUrls: ['./time-bar.component.scss']
})
export class TimeBarComponent implements OnInit{
  buildingid = 31;
  temperature;
  now:number;

  constructor(private chartDataService: ChartDataService) {}


  ngOnInit() {



    //set time to now
    this.now = Date.now();

    //set up interval to change the time every minute
    setInterval(()=> {
      this.now = Date.now();
    }, 60 * 1000);

    //setup the temperature 5 seconds after page load to allow for server to send data
    setTimeout(()=>{
      this.temperature = Math.round(this.chartDataService.getTemperature()) + " \xB0F";
    }, 5000);


    //update the temperature every 15 minutes
    setInterval(()=> {
      this.temperature = Math.round(this.chartDataService.getTemperature()) + " \xB0F";
    }, 15 * 60 * 1000); //15 minutes

  }

}
