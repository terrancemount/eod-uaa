import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";

@Injectable()
export class ChartYaxesService {

  yAxes = [{
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
      display: true,
      labelString: 'Natural Gas Demand (CCT / hour)'
    }
  }, {
    id: 3,
    position: 'left',
    display: false,
    scaleLabel: {
      display: true,
      labelString: 'Water Usage (Gallons)'
    }
  }, {
    id: 4,
    position: 'right',
    display: true,
    scaleLabel: {
      display: true,
      labelString: 'Outside Temperature (\xB0F)'
    }
  }]; //yAxes close


  getSelectedYaxes(){
      let data = this.yAxes.filter(axis => axis.id === 1 || axis.id === 4);
      return JSON.parse(JSON.stringify(data));

  }

  getAllChartYaxes(){
    return this.yAxes;
  }
}
