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
import { ErrorResponseDialogComponent } from '../../error-response-dialog/error-response-dialog.component';
import { IsPageLoading } from 'src/app/services/is-loading-emitter.service';

const REPORT_DATA: IReportData[] = [
  {
    projectId: 1,
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
    projectId: 2,
    assignmentId: 2,
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
    assignmentId: 3,
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
  isEdited = false;
  currentReportId: number;
  currentReportIndex: number;

  filterValues = {
    projectId: "",
    assignmentId: "",
    statusId: "",
    startDate: "",
    endDate: ""
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

  projects: Array<IProject> = [
    { id: 3, name: "MED", projectManagerId: 5 },
    { id: 1, name: "EDU-pr", projectManagerId: 5 },
    { id: 2, name: "adasdasd", projectManagerId: 5 },
    { id: 4, name: "cancerheal", projectManagerId: 5 }
  ];

  tasks: Array<IAssignment> = [
    { id: 1, name: "bug fixing" },
    { id: 2, name: "testing" },
    { id: 3, name: "dev" },
    { id: 4, name: "design" }
  ];

  statuses: Array<IStatus> = [
    { id: 4, name: "Opened" },
    { id: 2, name: "Notified" },
    { id: 3, name: "Accepted" },
    { id: 1, name: "Declined" }
  ];

  // projects: Array<IProject> = [{ id: 3, name: "RDM", projectManagerId: 2 }];

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
  filterForm: FormGroup;

  constructor(
    private reportHttpService: ReportHttpService,
    private reportValidator: ReportValidator,
    private dialog: MatDialog,
    private pageLoading: IsPageLoading
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.pageLoading.isLoading.next(true);
    this.createReportForm();
    this.createFilterForm();
    this.subscribeFilters();

    this.resetForm();
    this.onGet();
    this.dataSource.data = this.dataSource.data;
    this.dataSource.filterPredicate = this.tableFilters();
    this.pageLoading.isLoading.next(false);

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
        this.reportValidator.startDateValidation
      ]),
      endDateControl: new FormControl(null, Validators.required)
    });
  }

  createFilterForm() {
    this.filterForm = new FormGroup({
      filterProjectControl: new FormControl(null),
      filterTaskControl: new FormControl(null),
      filterStatusControl: new FormControl(null),
      fromCheckControl: new FormControl(null),
      toCheckControl: new FormControl(null),
      filterFromControl: new FormControl(null),
      filterToControl: new FormControl(null)
    });

    this.filterForm.get("fromCheckControl").valueChanges.subscribe(v => {
      if (v) {
        this.filterForm.get("filterFromControl").disable();
      } else {
        this.filterForm.get("filterFromControl").enable();
      }
    });
    this.filterForm.get("toCheckControl").valueChanges.subscribe(v => {
      if (v) {
        this.filterForm.get("filterToControl").disable();
      } else {
        this.filterForm.get("filterToControl").enable();
      }
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

  // function for table filterPredicate
  tableFilters(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      if (
        searchTerms.projectId &&
        searchTerms.assignmentId &&
        searchTerms.statusId
      ) {
        return (
          data.projectId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.projectId) !== -1 &&
          data.assignmentId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.assignmentId) !== -1 &&
          data.statusId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.statusId) !== -1
        );
      } else if (searchTerms.projectId && searchTerms.assignmentId) {
        return (
          data.projectId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.projectId) !== -1 &&
          data.assignmentId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.assignmentId) !== -1
        );
      } else if (searchTerms.projectId && searchTerms.statusId) {
        return (
          data.projectId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.projectId) !== -1 &&
          data.statusId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.statusId) !== -1
        );
      } else if (searchTerms.assignmentId && searchTerms.statusId) {
        return (
          data.assignmentId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.assignmentId) !== -1 &&
          data.statusId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.statusId) !== -1
        );
      } else if (searchTerms.projectId) {
        return (
          data.projectId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.projectId) !== -1
        );
      } else if (searchTerms.assignmentId) {
        return (
          data.assignmentId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.assignmentId) !== -1
        );
      } else if (searchTerms.statusId) {
        return (
          data.statusId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.statusId) !== -1
        );
      } else {
        return data;
      }
    };
    return filterFunction;
  }

  // pushing new report to array
  onSubmit() {
    const reportData: IReportData = {
      projectId: +this.reportForm.get("projectControl").value,
      assignmentId: +this.reportForm.get("taskControl").value,
      description: this.reportForm.get("descriptionControl").value,
      time: +this.reportForm.get("timeControl").value,
      overtime: +this.reportForm.get("overtimeControl").value,
      startDate: this.reportForm.get("startDateControl").value,
      endDate: this.reportForm.get("endDateControl").value,
      userId: 7,
      // userId: 2,
      statusId: +this.statuses.find(status => status.name === "Opened").id
    };
    if (reportData.startDate !== reportData.endDate) {
      alert(
        "Sorry, but on this project you can choose only same start and end date!"
      );
      return;
    } else if (this.isEdited) {
      this.isEdited = false;
      this.reportHttpService
        .patchData(reportData, this.currentReportId)
        .subscribe(
          (data: IReportData) => {
            console.log(data);
            this.dataSource.data[this.currentReportIndex] = data;
            this.dataSource._updateChangeSubscription();
          },
          error => console.log(error)
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
          console.log(data);
          const startDate = data.startDate.split("T");
          data.startDate = startDate[0];
          const endDate = data.endDate.split("T");
          data.endDate = endDate[0];

          console.log(reportData);
          this.dataSource.data.push(data);
          this.dataSource._updateChangeSubscription();
          // this.reports.push(reportData);
        },
        error => console.log(error)
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
      // this.dataSource.data.splice(index, 1);
      // this.dataSource._updateChangeSubscription();
      // this.reports.splice(index, 1);
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
    const index: number = this.dataSource.data.indexOf(report);
    if (index !== -1) {
      // sending new status to DB
      this.reportHttpService.patchData(report, report.id).subscribe(
        (data: IReportData) => {
          this.dataSource.data[index].statusId = this.statuses.find(
            status => status.name === "Notified"
          ).id;

          console.log(data);
          this.dataSource._updateChangeSubscription();
        },
        error => console.log(error)
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
    this.reportHttpService.getData().subscribe(data => {
      if (data.length > 0) {
        data.forEach(report => {
          const startDate = report.startDate.split("T");
          report.startDate = startDate[0];
          const endDate = report.endDate.split("T");
          report.endDate = endDate[0];
        });
        console.log(data);
        // this.reports = data;
        this.dataSource.data = data;
      }
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
