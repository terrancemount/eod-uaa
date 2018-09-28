import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { throwError, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { ErrorService } from "./error.service";

@Injectable()
export class ImageService{

  constructor (private http: HttpClient, private errorService: ErrorService){}

  getImageUrls():Observable<any>{
    return this.http.get(environment.serverURL + `/images`)
    .pipe(
      catchError(this.errorService.handleHttpError)
    );
  }
}
