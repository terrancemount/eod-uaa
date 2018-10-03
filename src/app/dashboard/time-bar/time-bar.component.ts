import { Component, OnInit, DoCheck, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ChartDataService } from '../../services/chart-data.service';

@Component({
  selector: 'app-time-bar',
  templateUrl: './time-bar.component.html',
  styleUrls: ['./time-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeBarComponent implements OnInit {
  temperature: number;
  now: number;

  constructor(private chartDataService: ChartDataService,
    private cdr: ChangeDetectorRef) { }


  ngOnInit() {

    //set time to now
    this.now = Date.now();
    this.retrieveTemperature(10); //try to retrieve for 5 seconds

    //set up interval to change the time every minute
    setInterval(() => {
      this.now = Date.now();
      this.cdr.detectChanges();
    }, 60 * 1000);

    //update the temperature every 15 minutes
    setInterval(() => {
      this.temperature = Math.round(this.chartDataService.getTemperature());
    }, 15 * 60 * 1000); //15 minutes

  }

  /**
   * Gets the temperature from the ChartDataService.
   * If invalid temperature is found then it keep trying
   * every 1 second to get to get a valid temperature.
   * Do use this component on somthing that doesn't set
   * the chart data. will only keep trying for the
   * number of tries in parameter. If runs out of tries
   * then it throws and error.
   * @param {number} tries a number of times to keep retring to get the temperature
   * @returns null,  this will set the temp itself.
   */
  retrieveTemperature(tries: number) {
    const temp = Math.round(this.chartDataService.getTemperature());

    //check if the temp is valid, if not then set a time out and call this function again.
    if (Math.abs(temp) > 150 && tries > 0) {
      if (tries > 0) {
        setTimeout(() => {
          this.retrieveTemperature(tries - 1);
        }, 1000); //call again in 1 second
      } else {
        throw "Unable to set temperature, nothing is calling the chartDataservice.getData() function."
      }
    } else {
      //set the number where it is vaild or not, will have to deal with invalid numbers later.
      this.temperature = temp;
      this.cdr.detectChanges(); //detect any changes to this component explicityly.
    }
  }
}
