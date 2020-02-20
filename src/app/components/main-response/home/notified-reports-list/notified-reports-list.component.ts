import { Component, OnInit, ViewChild } from "@angular/core";
import {
  IReportData,
  IStatus,
  IAssignment,
  IProject
} from "src/app/interfaces/report-data";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { FormGroup, FormControl } from "@angular/forms";
import { FilterTableService } from "src/app/services/filter-table..service";
import { IsPageLoading } from "src/app/services/is-loading-emitter.service";
import { IUserData } from "src/app/interfaces/user-data";
import { ProjectForPMService } from "src/app/services/project-4-pm.service";

const REPORT_DATA: IReportData[] = [];

@Component({
  selector: "app-notified-reports-list",
  templateUrl: "./notified-reports-list.component.html",
  styleUrls: ["./notified-reports-list.component.scss"]
})
export class NotifiedReportsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  applyBtnDisabled: boolean = false;

  filterValues = {
    projectId: "",
    assignmentId: "",
    statusId: ""
  };

  displayedColumns: string[] = [
    "user",
    "abbr",
    "task",
    "time",
    "overtime",
    "description",
    "startDate",
    "endDate",
    "status",
    "actions"
  ];

  statuses: Array<IStatus> = [];
  tasks: Array<IAssignment> = [];

  projects: Array<IProject> = [];

  developers: Array<IUserData> = [];
  reports: Array<IReportData> = new Array<IReportData>();

  // dataSourse here is source for table - observable
  dataSource = new MatTableDataSource<IReportData>(REPORT_DATA);
  // dataSource = new MatTableDataSource<IReportData>(this.reports);

  filterForm: FormGroup;
  filterDateForm: FormGroup;

  position: number;

  constructor(
    private dialog: MatDialog,
    private pageLoading: IsPageLoading,
    private filterTableService: FilterTableService,
    private pmService: ProjectForPMService
  ) {}

  // TODO write & implement notified reports service
  // to get all notified reports
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.defaultDataList();

    this.pageLoading.isLoading.next(true);
    this.createFilterForm();
    this.subscribeFilters();
    this.createFilterDateForm();
    this.position = JSON.parse(localStorage.getItem("userData")).positionId;

    // if (this.position === 2) {
    //   this.displayedColumns = [
    //     "user",
    //     "task",
    //     "time",
    //     "overtime",
    //     "description",
    //     "startDate",
    //     "endDate",
    //     "status",
    //     "actions"
    //   ];
    // }
    this.onGet();
    this.statuses.splice(
      this.statuses.indexOf(
        this.statuses.find(status => status.name === "Opened")
      ),
      1
    );
    this.statuses.splice(
      this.statuses.indexOf(
        this.statuses.find(status => status.name === "Declined")
      ),
      1
    );

    this.dataSource.filterPredicate = this.filterTableService.filterProjectTaskStatus();
    this.pageLoading.isLoading.next(false);
    this.startedListSort();
    this.dataSource._updateChangeSubscription();
  }

  startedListSort() {
    if (
      this.statuses.find(s => s.name === "Notified").id <
      this.statuses.find(s => s.name === "Accepted").id
    ) {
      this.dataSource.data.sort((a, b) => (a.statusId < b.statusId ? -1 : 0));
    } else {
      this.dataSource.data.sort((a, b) => (a.statusId > b.statusId ? -1 : 0));
    }
  }

  defaultDataList() {
    this.statuses = JSON.parse(localStorage.getItem("statusesData"));
    this.tasks = JSON.parse(localStorage.getItem("tasksData"));
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

  onGet() {
    if (JSON.parse(localStorage.getItem("userData")).positionId === 3) {
      this.pmService
        .getReportsForPm(JSON.parse(localStorage.getItem("userData")).id)
        .subscribe(
          responseData => {
            console.log(responseData);
            (this.reports = responseData.developersReports),
              (this.developers = responseData.pmDevelopers),
              (this.projects = responseData.projects);

            this.dataSource.data = this.reports;
            this.dataSource._updateChangeSubscription();
          },
          error => {
            console.log(error);
          }
        );
    } else {
      this.pmService
        .getReportsForTeamLead(JSON.parse(localStorage.getItem("userData")).id)
        .subscribe(
          responseData => {
            console.log(responseData);
            (this.reports = responseData.usersReports),
              (this.developers = responseData.users);
            (this.projects = responseData.projects);

            this.dataSource.data = this.reports;
            this.dataSource._updateChangeSubscription();
          },
          error => {
            console.log(error);
          }
        );
    }
  }

  // to accept it
  onAccept(report: IReportData) {
    this.pageLoading.isLoading.next(true);
    this.pmService.acceptedReport(report).subscribe(
      responseData => {
        this.pageLoading.isLoading.next(false);

        this.reports.find(elem => elem.id === report.id).statusId =
          responseData.statusId;
        this.dataSource.data = this.reports;
        this.dataSource._updateChangeSubscription();
      },
      error => {
        this.pageLoading.isLoading.next(false);
        alert(error);
      }
    );
  }

  // to decline it
  // IMPLEMENT NEW DECLINE DIALOG WINDOW with description of decline by email
  onDecline(report: IReportData) {
    this.pageLoading.isLoading.next(true);

    this.pmService.declinedReport(report).subscribe(
      responseData => {
        this.pageLoading.isLoading.next(false);

        const index = this.reports.indexOf(
          this.reports.find(elem => elem.id === report.id)
        );
        this.reports.splice(index, 1);
        this.dataSource.data = this.reports;
        this.dataSource._updateChangeSubscription();
      },
      error => {
        this.pageLoading.isLoading.next(false);
        alert(error);
      }
    );
  }

  getStatusById(id: number) {
    return this.statuses.find(status => status.id == id).name;
  }

  getProjectById(id: number) {
    return this.projects.find(project => project.id == id).name;
  }

  getTaskById(id: number) {
    return this.tasks.find(task => task.id == id).name;
  }

  getUserNameById(id: string) {
    return (
      this.developers.find(user => user.id === id).firstName +
      " " +
      this.developers.find(user => user.id === id).secondName
    );
  }
}
