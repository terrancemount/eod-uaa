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
      yAxisID: 4
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
}
