import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { IAssignment, IPosition, IStatus } from "../interfaces/report-data";
import { ErrorResponseDialogComponent } from "../components/main-response/error-response-dialog/error-response-dialog.component";
import { MatDialog } from "@angular/material";

interface IDefaultInfo {
  assignmentDto: Array<IAssignment>;
  positionDto: Array<IPosition>;
  statusDto: Array<IStatus>;
}

@Injectable()
export class FetchDefaultInfoService {
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  fetchDefaultInfo() {
    return this.http
      .get<IDefaultInfo>(environment.apiUrl + "/info")
      .pipe(catchError(this.errorHandling));

  }



  private errorHandling(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse.message);
  }


}
