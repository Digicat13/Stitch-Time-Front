import { Component, OnInit, ViewChild } from "@angular/core";
import {
  IReportData,
  IProject,
  IAssignment,
  IStatus
} from "src/app/interfaces/report-data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as moment from "moment";
import { ReportHttpService } from "src/app/services/report-http.service";
import { Time } from "@angular/common";
import "bootstrap/dist/js/bootstrap.bundle";
import { ReportValidator } from "../../../../validators/reports.validator";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { IsPageLoading } from "src/app/services/is-loading-emitter.service";
import { ErrorResponseDialogComponent } from '../../error-response-dialog/error-response-dialog.component';

const REPORT_DATA: IReportData[] = [
  {
    projectId: 3,
    assignmentId: 1,
    description:
      "sdadasdasdasdsdadasdasdasddsdadasdasdasddsdadasdasdasddsdadasdasdasddsdadasdasdasddsdadasdasdasddsdadasdasdasddsdadasdasdasddsdadasdasdasddsdadasdasdasddsdadasdasdasddsdadasdasdasddsdadasdasdasddsdadasdasdasddsdadasdasdasddd",
    time: 2,
    overtime: 1,
    startDate: "2020-02-04",
    endDate: "2020-02-04",
    userId: 7,
    statusId: 4
  },
  {
    projectId: 3,
    assignmentId: 1,
    description: "ssdasdsad",
    time: 0,
    overtime: 0,
    startDate: "2020-02-04T17:43:53.491Z",
    endDate: "2020-02-04T17:43:53.491Z",
    userId: 7,
    statusId: 1
  },
  {
    projectId: 3,
    assignmentId: 1,
    description: "lol",
    time: 0,
    overtime: 0,
    startDate: "2020-02-04T17:43:53.491Z",
    endDate: "2020-02-04T17:43:53.491Z",
    userId: 7,
    statusId: 2
  },
  {
    projectId: 3,
    assignmentId: 1,
    description: "lol",
    time: 0,
    overtime: 0,
    startDate: "2020-02-04T17:43:53.491Z",
    endDate: "2020-02-04T17:43:53.491Z",
    userId: 7,
    statusId: 3
  },
  {
    projectId: 3,
    assignmentId: 1,
    description: "lol",
    time: 0,
    overtime: 0,
    startDate: "2020-02-04T17:43:53.491Z",
    endDate: "2020-02-04T17:43:53.491Z",
    userId: 7,
    statusId: 4
  },
  {
    projectId: 3,
    assignmentId: 1,
    description: "lol",
    time: 0,
    overtime: 0,
    startDate: "2020-02-04T17:43:53.491Z",
    endDate: "2020-02-04T17:43:53.491Z",
    userId: 7,
    statusId: 4
  },
  {
    projectId: 3,
    assignmentId: 1,
    description: "lol",
    time: 0,
    overtime: 0,
    startDate: "2020-02-04T17:43:53.491Z",
    endDate: "2020-02-04T17:43:53.491Z",
    userId: 7,
    statusId: 4
  },
  {
    projectId: 3,
    assignmentId: 1,
    description: "lol",
    time: 0,
    overtime: 0,
    startDate: "2020-02-04T17:43:53.491Z",
    endDate: "2020-02-04T17:43:53.491Z",
    userId: 7,
    statusId: 4
  },
  {
    projectId: 3,
    assignmentId: 1,
    description: "lol",
    time: 0,
    overtime: 0,
    startDate: "2020-02-04T17:43:53.491Z",
    endDate: "2020-02-04T17:43:53.491Z",
    userId: 7,
    statusId: 4
  }
];

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"]
})
export class ReportsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  isEdited: boolean = false;
  currentReportId: number;
  currentReportIndex: number;

  //@ViewChild("table", { static: true }) table;

  // Displayed columns in the main table
  displayedColumns: string[] = [
    "project",
    "task",
    "time",
    "overtime",
    "description",
    "startDate",
    "endDate",
    "status",
    "actions"
  ];

  projects: Array<IProject> = [
    { id: 3, name: "RDM", projectManagerId: 2 }
    // { id: 1, name: "EDU-pr", projectManagerId: 5 },
    // { id: 2, name: "adasdasd", projectManagerId: 5 },
    // { id: 4, name: "cancerheal", projectManagerId: 5 }
  ];

  tasks: Array<IAssignment> = [
    // { id: 3, name: "bug fixing" },
    // { id: 2, name: "testing" },
    { id: 1, name: "dev" }
    // { id: 4, name: "design" }
  ];

  statuses: Array<IStatus> = [
    { id: 1, name: "Opened" },
    { id: 2, name: "Notified" },
    { id: 3, name: "Accepted" },
    { id: 4, name: "Declined" }
  ];

  // projects: Array<IProject> = [{ id: 3, name: "RDM", projectManagerId: 3 }];

  // tasks: Array<IAssignment> = [{ id: 1, name: "Developing" }];

  // statuses: Array<IStatus> = [
  //   { id: 4, name: "Opened" },
  //   { id: 2, name: "Notified" },
  //   { id: 3, name: "Accepted" },
  //   { id: 1, name: "Declined" }
  // ];

  reports: Array<IReportData> = new Array<IReportData>();

  // dataSourse here is source for table - observable
  dataSource = new MatTableDataSource<IReportData>(REPORT_DATA);
  // dataSource = new MatTableDataSource<IReportData>(this.reports);

  reportForm: FormGroup;

  constructor(
    private reportHttpService: ReportHttpService,
    private reportValidator: ReportValidator,
    private pageLoading: IsPageLoading,
    private dialog: MatDialog
  ) {}

  ngOnInit() {

    this.dataSource.paginator = this.paginator;

    this.reportForm = new FormGroup({
      projectControl: new FormControl(null, Validators.required),
      taskControl: new FormControl(null, Validators.required),
      timeControl: new FormControl(null, Validators.required),
      overtimeControl: new FormControl(null, Validators.required),
      descriptionControl: new FormControl(null, Validators.required),
      startDateControl: new FormControl(null, [
        Validators.required,
        this.reportValidator.startDateValidation
      ]),
      endDateControl: new FormControl(null, Validators.required)
    });

    this.resetForm();
    this.onGet();
    this.dataSource.data = this.dataSource.data;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // pushing new report to array
  onSubmit() {
    this.pageLoading.isLoading.next(true);

    const reportData: IReportData = {
      projectId: +this.reportForm.get("projectControl").value,
      assignmentId: +this.reportForm.get("taskControl").value,
      description: this.reportForm.get("descriptionControl").value,
      time: +this.reportForm.get("timeControl").value,
      overtime: +this.reportForm.get("overtimeControl").value,
      startDate: this.reportForm.get("startDateControl").value,
      endDate: this.reportForm.get("endDateControl").value,
      userId: 1
      // userId: 2,
      // statusId: +this.statuses.find(status => status.name === "Opened").id
    };
    if (reportData.startDate !== reportData.endDate) {
      alert(
        "Sorry, but on this project you can choose only same start and end date!"
      );
    }
    // checking if this post new or old-on-editing (need to test)
    else if (this.isEdited) {
      this.isEdited = false;
      reportData.id = this.currentReportId;

      this.reportHttpService
        .putData(reportData, this.currentReportId)
        .subscribe(
          (data: IReportData) => {
            this.pageLoading.isLoading.next(false);
            let startDate = data.startDate.split("T");
            data.startDate = startDate[0];
            let endDate = data.endDate.split("T");
            data.endDate = endDate[0];
            console.log(data);
            this.dataSource.data[this.currentReportIndex] = data;
            this.dataSource._updateChangeSubscription();
          },
          error => {
            this.pageLoading.isLoading.next(false);

            console.log(error.message);
          }
        );
    } else {
      // posting data
      // TODO треба дочекатись валідації на бекенді, яка буде вертати нам час
      // що залишився на поточну дату
      // tempTime = this.howMuchTimeYouHave(reportData.startDate);

      // pushing into local array, sending request

      // CHANGE TO GET ID FROM POST RESPONSE
      this.reportHttpService.postData(reportData).subscribe(
        (data: IReportData) => {
          this.pageLoading.isLoading.next(false);

          console.log(data);
          let startDate = data.startDate.split("T");
          data.startDate = startDate[0];
          let endDate = data.endDate.split("T");
          data.endDate = endDate[0];

          this.dataSource.data.push(data);
          this.dataSource._updateChangeSubscription();
          //this.reports.push(reportData);
        },
        error => {
          this.pageLoading.isLoading.next(false);

          console.log(error);
        }
      );
    }
    // reseting form
    this.resetForm();
  }

  // LATER CHANGE
  // delete current report from array, set its values on form
  onEdit(report: IReportData) {
    this.isEdited = true;
    this.currentReportId = report.id;

    this.reportForm.reset();

    this.reportForm.patchValue({ projectControl: report.projectId });
    this.reportForm.patchValue({ taskControl: report.assignmentId });
    this.reportForm.patchValue({ timeControl: report.time });
    this.reportForm.patchValue({ overtimeControl: report.overtime });
    this.reportForm.patchValue({ descriptionControl: report.description });
    this.reportForm.patchValue({ startDateControl: report.startDate });
    this.reportForm.patchValue({ endDateControl: report.endDate });

    //const index: number = this.reports.indexOf(report);
    const index: number = this.dataSource.data.indexOf(report);
    if (index !== -1) {
      this.currentReportIndex = index;
      //this.dataSource.data.splice(index, 1);
      //this.dataSource._updateChangeSubscription();
      //this.reports.splice(index, 1);
    } else {
      console.log("onEdit: cant find index of report in dataSource");
    }
  }

  onCancel() {
    this.isEdited = false;
    this.currentReportIndex = -1;
    this.currentReportId = -1;

    this.resetForm();
  }

  // change report status CHANGE
  onNotify(report: IReportData) {
    this.pageLoading.isLoading.next(true);

    const index: number = this.dataSource.data.indexOf(report);
    if (index !== -1) {
      // sending new status to DB
      this.reportHttpService.patchData(report, report.id).subscribe(
        (data: IReportData) => {
          this.pageLoading.isLoading.next(false);

          this.dataSource.data[index].statusId = this.statuses.find(
            status => status.name === "Notified"
          ).id;

          console.log(data);
          this.dataSource._updateChangeSubscription();
        },
        error => {
          this.pageLoading.isLoading.next(false);

          console.log(error);
        }
      );
    }
    this.dataSource._updateChangeSubscription();
  }

  // patching default values
  resetForm() {
    this.reportForm.reset();

    const date = moment().format("YYYY-MM-DD");
    this.reportForm.patchValue({ timeControl: "1.0" });
    this.reportForm.patchValue({ overtimeControl: "0" });
    this.reportForm.patchValue({ startDateControl: date });
    this.reportForm.patchValue({ endDateControl: date });
  }

  onGet() {

    this.pageLoading.isLoading.next(true);
    this.reportHttpService.getData().subscribe(data => {
    this.pageLoading.isLoading.next(false);
      if (data.length > 0) {
        data.forEach(report => {
          let startDate = report.startDate.split("T");
          report.startDate = startDate[0];
          let endDate = report.endDate.split("T");
          report.endDate = endDate[0];
        });
        console.log(data);
        // this.reports = data;
        this.dataSource.data = data;
      }
    },
    error => {
    this.pageLoading.isLoading.next(false);
    this.openErrorResponseDialog(error.message);
    });
  }

  onDelete(report: IReportData) {
    if (!report.id) {
      alert("Report id is" + report.id);
    } else {
      this.reportHttpService.deleteData(report.id).subscribe(
        (data: IReportData) => {
          console.log(data);
          const index: number = this.dataSource.data.indexOf(report);
          if (index !== -1) {
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
          }
        },
        error => console.log(error)
      );
    }
    this.dataSource._updateChangeSubscription();
  }

  getProjectById(id: number) {
    return this.projects.find(project => project.id == id).name;
  }

  getTaskById(id: number) {
    return this.tasks.find(task => task.id == id).name;
  }

  getStatusById(id: number) {
    return this.statuses.find(status => status.id == id).name;
  }

  private howMuchTimeYouHave(
    currentDate: string
  ): { time: number; overtime: number } {
    return { time: 1, overtime: 0 };
  }

  openErrorResponseDialog(errorName: string) {
    const dialogRef = this.dialog.open(ErrorResponseDialogComponent, {
      width: "fit-content",
      data: errorName
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
