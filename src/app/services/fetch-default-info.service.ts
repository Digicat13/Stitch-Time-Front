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
  possitionDto: Array<IPosition>;
  statusDto: Array<IStatus>;
}

@Injectable()
export class FetchDefaultInfoService {
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  fetchDefaultInfo() {
    this.http
      .get<IDefaultInfo>(environment.apiUrl + "/info")
      .pipe(catchError(this.errorHandling))
      .subscribe(
        responseData => {
          console.log(responseData);
          localStorage.setItem("tasksData", JSON.stringify(responseData.assignmentDto));
          localStorage.setItem("possitionsData", JSON.stringify(responseData.possitionDto));
          localStorage.setItem("statusesData", JSON.stringify(responseData.statusDto));
        },
        errorData => {
          this.openErrorResponseDialog(errorData);
        }
      );
  }



  private errorHandling(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse.message);
  }

  private openErrorResponseDialog(errorName: string) {
    const dialogRef = this.dialog.open(ErrorResponseDialogComponent, {
      width: "fit-content",
      data: errorName
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
