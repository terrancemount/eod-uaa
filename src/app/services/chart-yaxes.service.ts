import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";

@Injectable()
export class ChartYaxesService {
  chartYaxes = [{
    buildingid: 31,
    yAxes: [{
      id: 1,
      position: 'left',
      display: true,
      scaleLabel: {
        display: true,
        labelString: 'Electrical Demand (KW)'
      }
    }, {
      id: 2,
      position: 'left',
      display: false,
      scaleLabel: {
        display: false,
        labelString: 'Natural Gas Demand (CCT)'
      }
    }, {
      id: 3,
      position: 'right',
      display: true,
      scaleLabel: {
        display: true,
        labelString: 'Outside Temperature (\xB0F)'
      }
    }] //yAxes close
  }, {
    buildingid: 41,
    yAxes: [{
      id: 4,
      position: 'left',
      display: true,
      scaleLabel: {
        display: true,
        labelString: 'Electrical Demand (KW)'
      }
    }, {
      id: 5,
      position: 'left',
      display: false,
      scaleLabel: {
        display: false,
        labelString: 'Natural Gas Demand (CCT)'
      }
    }, {
      id: 6,
      position: 'right',
      display: true,
      scaleLabel: {
        display: true,
        labelString: 'Outside Temperature (\xB0F)'
      }
    }] //yAxes close
  }]; //chartYaxis close

  getChartYaxes(buildingid: number):Observable<any>{
    return new Observable(obs => {
      const data = this.chartYaxes.find(d => d.buildingid === buildingid);

      if(data){
        obs.next(data);
      } else {
        obs.error("ChartYaxes Error: that building is not supported right now.");
        //todo: make a http request to get this from the server.
      }
      //this will make observable auto close after the first instance of ether next() or error()
    }).pipe(first());;
  }

}
