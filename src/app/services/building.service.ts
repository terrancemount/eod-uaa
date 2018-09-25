/**
 * Service to manage the building info.  Array of buildings are cashed locally.
 */
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";

@Injectable()
export class BuildingService{
  buildings = [{
    id:31,
    buildingcode: 'eib',
    name: 'Engineering and Industry Building',
    abbreviation: 'eib',
    collegecode: 'UAA'
  },{
    id:41,
    buildingcode: 'amb',
    name: 'AMB',
    abbreviation: 'amb',
    collegecode: 'UAA'
  }]

  /**
   * Get the array of buildings and return an observable.
   * Observables will close after returning one result.
   * Will throw error if the buildings local varable is set
   * to empty.
   * (Might make this into an HTTP call to pull data from
   * server).
   * @returns {Obserable<any>} an observable holding the data or error.
   */
  getBuildings():Observable<any>{
    return new Observable(obs => {
      if(this.buildings.length){ //length === 0
        obs.error('BuildingService Error: the buildings array is empty and no http request has been setup.');
      } else {
        obs.next(this.buildings);
      }
    }).pipe(first());
  }

  /**
   * Get a single object reprenenting the Building.  (name, code, etc)
   * Will throw error if buildingid is not found in local storage.
   * Http requests are not currently implemented.  On error the obserable will
   * not retry.
   * @param buildingid a number representing the id of the building to retrieve.
   * @returns {Obserable<any>} an observable holding the data or error.
   */
  getBuilding(buildingid):Observable<any>{
    return new Observable(obs => {
      let building = this.buildings.find(d => +d.id === buildingid);

      if(building){
        obs.next(building);
      } else {
        obs.error('BuildingService Error: buildingid = ' + buildingid + " is not supported currently");
      }
    }).pipe(first());
  }
}
