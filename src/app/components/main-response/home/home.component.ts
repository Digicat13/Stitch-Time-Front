import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { SignInUpService } from "src/app/services/sign-in-up.service";
import { IPosition } from "src/app/interfaces/report-data";
import { Router } from "@angular/router";
import { FetchDefaultInfoService } from "src/app/services/fetch-default-info.service";
import { ErrorResponseDialogComponent } from "../error-response-dialog/error-response-dialog.component";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  positionId: number;
  positions: Array<IPosition> = [];

  constructor(
    private signInUp: SignInUpService,
    private defaultInfoService: FetchDefaultInfoService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.positionId = +JSON.parse(localStorage.getItem("userData")).positionId;
    console.log(this.positionId);
    this.defaultInfoService.fetchDefaultInfo().subscribe(
      responseData => {
        console.log(responseData);
        localStorage.setItem(
          "tasksData",
          JSON.stringify(responseData.assignmentDto)
        );
        localStorage.setItem(
          "possitionsData",
          JSON.stringify(responseData.positionDto)
        );
        localStorage.setItem(
          "statusesData",
          JSON.stringify(responseData.statusDto)
        );
        this.positions = JSON.parse(localStorage.getItem("possitionsData"));
      },
      errorData => {
        this.openErrorResponseDialog(errorData);
      }
    );
  }

  onLogout() {
    this.signInUp.logout();
  }

  getPositionById(id: number) {
    return this.positions.find(position => position.id == this.positionId)
      .positionName;
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
