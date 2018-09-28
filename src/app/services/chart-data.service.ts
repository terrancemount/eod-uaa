import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { first, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { ErrorService } from "./error.service";

@Injectable()
export class ChartDataService {
  chartData;
  maxTicks:number = 7 * 24 * 4;


  constructor(private http: HttpClient, private errorService: ErrorService) { }

  getChartData(buildingid: number) {
    return new Observable(obs => {

      //get observable from http module
      this.http.get(environment.serverURL + `/api/chart-data/building/${buildingid}/ticks/${this.maxTicks + 1}`)
        .pipe(
          first(),
          catchError(this.errorService.handleHttpError)
        )
        .subscribe(
          results => {

            //run through all the keys in the results object
            for (let key in results) {

              //if it has a sub key of usage then send it to the generate demand function.
              if (results[key]['usage']) { //check if there is a useage.
                results[key]['demand'] = []; //create a new array for demand
                this.generateDemand(results[key].usage, results[key].demand, results['createddate']);
              }
            }

            //remove the first instance from the array.
            results['createddate'].splice(0, 1);

            this.chartData = results;

            //return the observable data
            obs.next(results);
          },
          error => console.log("ChartDataService: error with get for building = " + buildingid)
        );

      //this will make observable auto close after the first instance of ether next() or error()
    }).pipe(first());
  }

  /**
   * Generates a demand array by altering the demand array.
   * Both the time and usage array must be the same length.
   * After function runs the demand array will be
   * @param usage an array of usage from the server.
   * @param demand a calculated array to be altered by this function.
   * @param time an array of times from the server.
   */
  generateDemand(usage: number[], demand: number[], time: number[]) {
    let i = demand.length;

    //if demand has no length then push on a zero
    if (!demand.length) {
      demand.push(0);
    }

    for (let i = demand.length; i < usage.length; i++) {
      let usageDiff = usage[i] - usage[i - 1];
      const timeDiff = (time[i] - time[i - 1]) / 1000 / 60 / 60; //convert time difference to hours
      demand.push(usageDiff / timeDiff);
    }
    //remove one from both the usage and demand
    demand.splice(0, 1);
    usage.splice(0, 1);
  }

  /**
   * Gets the current temperature store in the chart data array.
   * If chart data is not set then it return 212 (boiling in feirenhit).
   * Zero is a possible temperature so that is not used but boiling will
   * never be avalid value.
   * @param buildingid a number for the building id.
   */
  getTemperature() {
    if (this.chartData) {
      return this.chartData.temperature[this.chartData.temperature.length - 1];
    }
    return 212; //invalid boiling point number
  }
}
