import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

@Injectable()
export class ErrorService{

    /**
   * Handle Observable errors.  Todo: need to make a logging report
   * @param err error from an observable
   */
  handleHttpError(err: HttpErrorResponse) {
    let errorMessage = "";

    //todo: implement a error loging service here
    if (err.error instanceof ErrorEvent) {
      errorMessage = "An error has occured: " + err.error.message;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(errorMessage);
  }

  /**
   * Error handler for all other types of error. Non httpErrorResponse errors.
   * @param err any type of output for error.
   */
  handleError(err:any){
    console.log(err);

  }
}
