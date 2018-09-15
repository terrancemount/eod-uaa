import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, range, throwError, interval } from 'rxjs';
import { environment } from '../../environments/environment'
import { map, filter, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  sensorReadings = [];
  numOfTicks = 7 * 24 * 4;
  $queryTimer;
  waitTime = 5; //seconds
  constructor(private http: HttpClient) { }


  /**
   * Start this service continuously looking for data from the server.
   */
  startQueryTimer() {
    this.$queryTimer = setInterval(() => {

      //todo: create a real data retrival system
      //this.sensorReadings[0].push(new Date());
      this.sensorReadings[1].push(Math.random() * 10 + 50);
      this.sensorReadings[2].push(Math.random() * 100 + 1000);
      this.sensorReadings[3].push(Math.random() * 10 + 60);

      //this.sensorReadings[0].splice(0,1);
      this.sensorReadings[1].splice(0,1);
      this.sensorReadings[2].splice(0,1);
      this.sensorReadings[3].splice(0,1);

    }, 1000);
  }



  /**
   * Get the sensor reading array from the service once the service has retrieved it from the server.
   * @param callback for when the request is complete or gives an error after wait time in seconds
   */
  getSensorReadingArray(callback) {
    if (!this.sensorReadings.length) { //if noting in sensorReadings then

      let time = this.floorCurrentTimeToFifteenMinutes();
      let ticks = this.numOfTicks;

      this.requestSensorReadingsFromServer(time, ticks, (err, data) => {
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

  // let ticks = this.calcTicksNeeded(floorCurrentTime);
  //let floorCurrentTime = this.floorTimeFifteenMinutes();

  /**
   * Get the sensor readings from the server to store in SensorService
   * @param callback is the callback used when the observable has returned data from server.
   */
  private requestSensorReadingsFromServer(time, ticks, callback) {
    let results;
    let params = new HttpParams()
      .set('time', time.toString())
      .set('ticks', ticks.toString());

    //get observable from http module
    let obs = this.http.get(environment.serverURL + `/api/eib`, { params: params }).pipe(
      //tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );

    //subscribe to the observable and store the sensor readings in an array for future use.
    obs.subscribe(
      data => {
        results = <any>data;
      },
      error => callback({ message: `Error with requesting sensor readings ${error}` }, null),
      () => { callback(null, results); }
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
  private calcTicksNeeded(comptime) {
    if (!this.sensorReadings.length) { //if sensor readings has not been initalized is length === 0
      return this.numOfTicks;
    }

    let lastTime = this.sensorReadings[0][this.sensorReadings[0].length - 1];

    //check for error.  current time should never be greater then last time
    if (comptime < lastTime) {
      //todo: make error log here.
      return 0;
    }

    let tickDiff = (comptime - lastTime) / (1000 * 60 * 15);
    return Math.min(Math.trunc(tickDiff), this.numOfTicks); //max number of ticks allowed is in numberOfTicks var
  }



  floorCurrentTimeToFifteenMinutes() {
    let dt = new Date();
    let minutes = Math.floor(dt.getMinutes() / 15) * 15;
    dt.setMinutes(minutes);
    dt.setSeconds(0);
    dt.setMilliseconds(0);
    return dt.getTime();
  }
}
