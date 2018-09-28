import { Injectable } from "@angular/core";
import { Observable, timer } from "rxjs";
import { first, retryWhen, delayWhen, map, retry } from "rxjs/operators";


@Injectable()
export class ChartDatasetService {
  chartDataset = [{
    buildingid: 31,
    datasets: [{
      id: 1,
      sensorcode: 'electrical_demand',
      chartTitle: 'How much Power does the EIB Need?',
      chartSubTitle: 'Electrical Demand for One Week.',
      label: 'Electricty Demand',
      borderColor: 'rgb(255, 205, 86)',
      backgroundColor: 'rgba(255, 205, 86, 0.5)',
      fill: true,
      hidden: false,
      yAxisID: 1
    }, {
      id: 2,
      sensorcode: 'naturalgas_demand',
      chartTitle: 'How much Gas does EIB Need?',
      chartSubTitle: 'Natural Gas Demand for One Week.',
      label: 'Natural Gas Demand',
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      hidden: true,
      fill: true,
      yAxisID: 2
    }, {
      id: 3,
      sensorcode: 'water_usage',
      chartTitle: 'How much water does EIB Use?',
      chartSubTitle: 'Water Usage for One Week.',
      label: 'Water Usage',
      borderColor: 'rgb(65,105,225)',
      backgroundColor: 'rgba(65,105,225, .5)',
      hidden: true,
      fill: true,
      yAxisID: 3
    }, {
      id: 4,
      sensorcode: 'temperature',
      label: 'Outside Temperature',
      borderColor: 'rgb(201, 203, 207)',
      backgroundColor: 'rgb(201, 203, 207)',
      hidden: false,
      fill: false,
      yAxisID: 4
    }]
  }, {
    buildingid: 41,
    datasets: [{
      id: 5,
      sensorcode: 'electrical_demand',
      label: 'Electricty Demand',
      borderColor: 'rgb(255, 205, 86)',
      backgroundColor: 'rgba(255, 205, 86, 0.5)',
      fill: true,
      hidden: false,
      yAxisID: 1
    }, {
      id: 6,
      sensorcode: 'naturalgas_demand',
      label: 'Natural Gas Demand',
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      hidden: true,
      fill: true,
      yAxisID: 2
    }, {
      id: 7,
      sensorcode: 'temperature',
      label: 'Outside Temperature',
      borderColor: 'rgb(201, 203, 207)',
      backgroundColor: 'rgb(201, 203, 207)',
      hidden: false,
      fill: false,
      yAxisID: 3
    }]
  }]


  constructor() { }

  /**
   * Get the observable for the building Dataset.
   * @param buildingid a number for the id of the building bein displayed
   */
  getChartDataset(buildingid: number): Observable<any> {
    return new Observable(obs => {
      const data = this.chartDataset.find(d => +d.buildingid === buildingid);

      if (data) {
        obs.next(data);
      } else {
        obs.error("ChartDatasetService Error: that building is not supported right now.");
        //todo: make a http request to get this from the server.
      }
      //this will make observable auto close after the first instance of ether next() or error()
    }).pipe(first());;
  }

  /**
   * Gets the dataset array for the buttons.  This function will
   * retry two times with a two second each time on a failure.
   * If it fails three times then it will send out an error.
   * @param building
   */
  getButtonData(buildingid: number): Observable<any> {
    return new Observable(obs => {

      //look for the data on the server.
      obs.next(this.chartDataset.find(d => +d.buildingid === buildingid));

    }).pipe(
      map(data => {
        if(!data){
          //throw and error if data is null or undefined
          throw 'ChartDatasetService Error: failed three times to get the ButtonData for buildingid = ' + buildingid;
        }
        //else return the data.
        return data;
      }),
      retryWhen(errors =>
        errors.pipe(
          delayWhen(() => timer(2000))
        )
      ),
      retry(2),
      first()

    );
  }
  /**
   * Sets the visablity for the given datasetid.
   * @param {number} datasetid a number representing the id for the dataset.
   * @param {boolean} visablity a boolean for turning on or off the visablity of the dataset.
   */
  setDatasetVisablity(datasetid: number, visablity: boolean): boolean {
    let dataset;
    let index = 0;
    while (!dataset && index < this.chartDataset.length) {
      dataset = this.chartDataset[index].datasets.find(d => d.id === datasetid);
    }

    if (dataset) {
      dataset.hidden = visablity;
      return true; //found and set successfully
    }
    return false; //not found
  }
}
