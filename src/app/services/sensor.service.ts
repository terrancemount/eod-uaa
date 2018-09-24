import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, range, throwError, interval } from 'rxjs';
import { environment } from '../../environments/environment'
import { map, filter, catchError, tap } from 'rxjs/operators';
import * as cleanTime from '../../../shared/cleanTime';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  sensorReadings = [];
  numOfTicks = 7 * 24 * 4;
  $queryTimer;
  waitTime = 5; //seconds
  buildingId = 4;

  constructor(private http: HttpClient) { }


  /**
   * Start this service continuously looking for data from the server.
   */
  startQueryTimer() {
    this.$queryTimer = setInterval(() => {

      const ticks = this.calcTicksNeeded();

      console.log(ticks);

      if (ticks > 0) {
        this.requestSensorReadingsFromServer(this.buildingId, ticks, (err, data) => {
          if (!err) {
            for (let i = 0; i < data.length; i++) {
              this.sensorReadings[i].push(...data[i]);
              this.sensorReadings[i].splice(0, data[i].length);
            }
          }
        })
      }
    }, 30000);
  }


  //callback(err, sensorData, chartConfig)


  getChartComponets(buildingId, callback){




  }

  getSensorDataObservable(buildingId, ticks){

  }
  getChartConfigObservable(buildingId){

  }


  /**
   * Get the sensor reading array from the service once the service has retrieved it from the server.
   * @param callback for when the request is complete or gives an error after wait time in seconds
   */
  getSensorReadingArray(buildingId: number, callback) {
    if (buildingId != this.buildingId || !this.sensorReadings.length) { //if noting in sensorReadings then
      this.buildingId = buildingId;

      let ticks = this.numOfTicks;

      this.requestSensorReadingsFromServer(buildingId, ticks, (err, data) => {
        if (err) {
          callback(err, null);
        } else {
          this.sensorReadings = data;
          callback(err, data);
        }
      });

      this.startQueryTimer(); //start keeping track of queries

    } else {
      callback(null, this.sensorReadings);
    }
  }

  /**
   * Get the outside temperature for a building.
   * @param {number} buildingid for the buidings outside temperature to retrieve.
   */
  getCurrentTemperature(buildingid: number): number {
    //todo: make this relevant for a building other then EIB.

    //check if the sensor readings table has been set
    if (this.sensorReadings.length) {

    }
    //return a default value of 50 if the sensor readings has not been set.
    return 50;
  }


  /**
   * Get the sensor readings from the server to store in SensorService
   * @param callback is the callback used when the observable has returned data from server.
   */
  private requestSensorReadingsFromServer(buildingId, ticks, callback) {


    //get observable from http module
    this.http.get(environment.serverURL + `/api/chart-data/building/${buildingId}/ticks/${ticks}`).pipe(
      //tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
      .subscribe(
        data => callback(null, <any>data),
        error => callback({ message: `Error with requesting sensor readings ${error}` }, null)
      );
  }
  /**
   * Handle Observable errors.  Todo: need to make a logging report
   * @param err error from an observable
   */
  private handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      errorMessage = "An error has occured: " + err.error.message;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(errorMessage);
  }

  /**
   * calculate number of ticks needed to make one week of 15 minute ticks
   */
  private calcTicksNeeded() {
    if (!this.sensorReadings.length) { //if sensor readings has not been initalized is length === 0
      return this.numOfTicks;
    }

    const currentTime = Date.now();
    const lastTime = this.sensorReadings[0][this.sensorReadings[0].length - 1];
    const ticks = Math.trunc((currentTime - lastTime) / 60 / 1000);


    return Math.min(ticks, this.numOfTicks); //max number of ticks allowed is in numberOfTicks var
  }
}

