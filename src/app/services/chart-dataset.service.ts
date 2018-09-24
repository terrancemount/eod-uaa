import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";


@Injectable()
export class ChartDatasetService {
  chartDataset = [{
    buildingid: 31,
    datasets: [{
      id: 1,
      sensorcode: 'electrical_demand',
      label: 'Electricty Demand',
      borderColor: 'rgb(255, 205, 86)',
      backgroundColor: 'rgba(255, 205, 86, 0.5)',
      fill: true,
      hidden: false,
      yAxisID: 1
    }, {
      id: 2,
      sensorcode: 'naturalgas_demand',
      label: 'Natural Gas Demand',
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      hidden: true,
      fill: true,
      yAxisID: 2
    }, {
      id: 3,
      sensorcode: 'temperature',
      label: 'Outside Temperature',
      borderColor: 'rgb(201, 203, 207)',
      backgroundColor: 'rgb(201, 203, 207)',
      hidden: false,
      fill: false,
      yAxisID: 3
    }]
  }, {
    buildingid: 41,
    datasets: [{
      id: 4,
      sensorcode: 'electrical_demand',
      label: 'Electricty Demand',
      borderColor: 'rgb(255, 205, 86)',
      backgroundColor: 'rgba(255, 205, 86, 0.5)',
      fill: true,
      hidden: false,
      yAxisID: 1
    }, {
      id:5,
      sensorcode: 'naturalgas_demand',
      label: 'Natural Gas Demand',
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      hidden: true,
      fill: true,
      yAxisID: 2
    }, {
      id: 6,
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
      const data = this.chartDataset.find(d => d.buildingid === buildingid);

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
   * Sets the visablity for the given datasetid.
   * @param {number} datasetid a number representing the id for the dataset.
   * @param {boolean} visablity a boolean for turning on or off the visablity of the dataset.
   */
  setDatasetVisablity(datasetid: number, visablity: boolean):boolean{
    let dataset;
    let index = 0;
    while(!dataset && index < this.chartDataset.length){
      dataset = this.chartDataset[index].datasets.find(d => d.id === datasetid);
    }

    if(dataset){
      dataset.hidden = visablity;
      return true; //found and set successfully
    }
    return false; //not found
  }
}
