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
import "bootstrap/dist/js/bootstrap.bundle";
import { ReportValidator } from "../../../../validators/reports.validator";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { ErrorResponseDialogComponent } from "../../error-response-dialog/error-response-dialog.component";
import { IsPageLoading } from "src/app/services/is-loading-emitter.service";
import { FilterTableService } from "src/app/services/filter-table..service";
import { SignInUpService } from "src/app/services/sign-in-up.service";
import { IProjectData } from "src/app/interfaces/project-data";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"]
})
export class ReportsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  isEdited = false;
  currentReportId: number;
  currentReportIndex: number;
  applyBtnDisabled: boolean = false;

  filterValues = {
    projectId: "",
    assignmentId: "",
    statusId: ""
  };

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

  projects: Array<IProjectData> = [];

  tasks: Array<IAssignment> = [];

  statuses: Array<IStatus> = [];

  reports: Array<IReportData> = new Array<IReportData>();

  // dataSourse here is source for table - observable
  // dataSource = new MatTableDataSource<IReportData>(REPORT_DATA);
  dataSource = new MatTableDataSource<IReportData>(this.reports);

  reportForm: FormGroup;
  filterForm: FormGroup;
  filterDateForm: FormGroup;

  constructor(
    private reportHttpService: ReportHttpService,
    private reportValidator: ReportValidator,
    private dialog: MatDialog,
    private pageLoading: IsPageLoading,
    private filterTableService: FilterTableService,
    private signInUpService: SignInUpService
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.pageLoading.isLoading.next(true);

    this.createReportForm();
    this.createFilterForm();
    this.subscribeFilters();
    this.createFilterDateForm();

    this.resetForm();
    this.defaultDataList();
    this.onGet();
    // this.dataSource.data = this.dataSource.data;
    this.pageLoading.isLoading.next(false);
    this.dataSource.filterPredicate = this.filterTableService.filterProjectTaskStatus();
  }

  defaultDataList() {
    this.statuses = JSON.parse(localStorage.getItem("statusesData"));
    this.tasks = JSON.parse(localStorage.getItem("tasksData"));
  }

  createReportForm() {
    this.reportForm = new FormGroup({
      projectControl: new FormControl(null, Validators.required),
      taskControl: new FormControl(null, Validators.required),
      timeControl: new FormControl(null, Validators.required),
      overtimeControl: new FormControl(null, Validators.required),
      descriptionControl: new FormControl(null, Validators.required),
      startDateControl: new FormControl(null, [
        Validators.required,
        this.reportValidator.DateValidation
      ]),
      endDateControl: new FormControl(null, Validators.required)
    });
  }

  createFilterForm() {
    this.filterForm = new FormGroup({
      filterProjectControl: new FormControl(null),
      filterTaskControl: new FormControl(null),
      filterStatusControl: new FormControl(null)
    });
  }

  createFilterDateForm() {
    this.filterDateForm = new FormGroup({
      filterFromControl: new FormControl(null),
      filterToControl: new FormControl(null)
    });
  }

  // subscribing for filter input change
  subscribeFilters() {
    this.filterForm
      .get("filterProjectControl")
      .valueChanges.subscribe(projectId => {
        this.filterValues.projectId = projectId;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
    this.filterForm
      .get("filterTaskControl")
      .valueChanges.subscribe(assignmentId => {
        this.filterValues.assignmentId = assignmentId;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
    this.filterForm
      .get("filterStatusControl")
      .valueChanges.subscribe(statusId => {
        this.filterValues.statusId = statusId;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
  }

  onApplyDateFilters() {
    this.reports = this.dataSource.data;
    const range = {
      from: this.filterDateForm.get("filterFromControl").value,
      to: this.filterDateForm.get("filterToControl").value
    };

    this.dataSource.data = this.dataSource.data.filter(
      this.filterTableService.filterDate(range)
    );
    this.applyBtnDisabled = true;
  }

  onClearFilters() {
    this.dataSource.data = this.reports;
    this.applyBtnDisabled = false;
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
      userId: JSON.parse(localStorage.getItem("userData")).id
    };

    if (this.isEdited) {
      reportData.id = this.currentReportId;
    }

    let responseTimeValidator = this.reportValidator.timePerDayValidator(
      this.dataSource.data,
      reportData,
      this.isEdited
    );
    if (reportData.startDate !== reportData.endDate) {
      this.pageLoading.isLoading.next(false);
      alert(
        "Sorry, but on this project you can choose only same start and end date!"
      );
      return;
    } else if (
      !responseTimeValidator.enoughtTime ||
      !responseTimeValidator.enoughtOverTime
    ) {
      this.pageLoading.isLoading.next(false);
      alert(
        "On this day You have " +
          responseTimeValidator.time +
          " hr left for work and " +
          responseTimeValidator.overtime +
          " hr overtime! Go HOME!"
      );
      return;
    } else if (this.isEdited) {
      this.isEdited = false;
      reportData.id = this.currentReportId;

      this.reportHttpService
        .putData(reportData, this.currentReportId)
        .subscribe(
          (data: IReportData) => {
            this.pageLoading.isLoading.next(false);
            const startDate = data.startDate.split("T");
            data.startDate = startDate[0];
            const endDate = data.endDate.split("T");
            data.endDate = endDate[0];

            this.dataSource.data[this.currentReportIndex] = data;
            this.dataSource._updateChangeSubscription();
          },
          error => {
            this.pageLoading.isLoading.next(false);

            this.openErrorResponseDialog(error.message);
            console.log(error.message);
          }
        );
    } else {
      // pushing into local array, sending request

      // CHANGE TO GET ID FROM POST RESPONSE
      this.reportHttpService.postData(reportData).subscribe(
        (data: IReportData) => {
          this.pageLoading.isLoading.next(false);
          const startDate = data.startDate.split("T");
          data.startDate = startDate[0];
          const endDate = data.endDate.split("T");
          data.endDate = endDate[0];

          this.dataSource.data.push(data);
          this.dataSource._updateChangeSubscription();
        },
        error => {
          this.pageLoading.isLoading.next(false);
          this.openErrorResponseDialog(error.message);

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

    // const index: number = this.reports.indexOf(report);
    const index: number = this.dataSource.data.indexOf(report);
    if (index !== -1) {
      this.currentReportIndex = index;
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
      this.reportHttpService.notifyReport(report).subscribe(
        (data: IReportData) => {
          this.pageLoading.isLoading.next(false);

          this.dataSource.data[index].statusId = this.statuses.find(
            status => status.name === "Notified"
          ).id;

          this.dataSource._updateChangeSubscription();
        },
        error => {
          this.pageLoading.isLoading.next(false);

          console.log(error);
          this.openErrorResponseDialog(error.error.detail);
        }
      );
    }
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

    this.signInUpService.getUserInfoById().subscribe(
      responseData => {
        this.pageLoading.isLoading.next(false);
        // console.log(responseData);
        if (responseData.user === null) {
          this.reports = [];
          return;
        }

        // console.log(responseData);
        this.reports = responseData.reports;
        if (this.reports.length > 0) {
          this.reports.forEach(report => {
            const startDate = report.startDate.split("T");
            report.startDate = startDate[0];
            const endDate = report.endDate.split("T");
            report.endDate = endDate[0];
          });
        }
        this.dataSource.data = this.reports;
        this.projects = responseData.projects;
      },
      error => {
        console.log("error");
        this.openErrorResponseDialog(error.message);
        this.pageLoading.isLoading.next(false);
      }
    );
  }

  onDelete(report: IReportData) {
    if (!report.id) {
      alert("Report id is" + report.id);
    } else {
      this.reportHttpService.deleteData(report.id).subscribe(
        (data: IReportData) => {
          // console.log(data);
          const index: number = this.dataSource.data.indexOf(report);
          if (index !== -1) {
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
            // this.reports = this.dataSource.data;
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
