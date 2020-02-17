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
    statusId: 2
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
    statusId: 2
  }
];

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

  statuses: Array<IStatus> = [
    { id: 1, name: "Opened" },
    { id: 2, name: "Notified" },
    { id: 3, name: "Accepted" },
    { id: 4, name: "Declined" }
  ];

  projects: Array<IProject> = [
    { id: 3, name: "RDM", projectManagerId: 2 },
    { id: 1, name: "EDU-pr", projectManagerId: 5 },
    { id: 2, name: "adasdasd", projectManagerId: 5 },
    { id: 4, name: "cancerheal", projectManagerId: 5 }
  ];

  tasks: Array<IAssignment> = [
    { id: 3, name: "bug fixing" },
    { id: 2, name: "testing" },
    { id: 1, name: "dev" },
    { id: 4, name: "design" }
  ];

  users: Array<IUserData> = [
    { id: 7, name: "John", surname: "Dou" },
    { id: 1, name: "John2", surname: "Dou" },
    { id: 2, name: "John3", surname: "Dou" },
    { id: 3, name: "John4", surname: "Dou" },
    { id: 4, name: "John5", surname: "Dou" }
  ];

  reports: Array<IReportData> = new Array<IReportData>();

  // dataSourse here is source for table - observable
  dataSource = new MatTableDataSource<IReportData>(REPORT_DATA);
  // dataSource = new MatTableDataSource<IReportData>(this.reports);

  filterForm: FormGroup;
  filterDateForm: FormGroup;

  constructor(
    private dialog: MatDialog,
    private pageLoading: IsPageLoading,
    private filterTableService: FilterTableService
  ) {}

  // TODO write & implement notified reports service
  // to get all notified reports
  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.pageLoading.isLoading.next(true);
    this.createFilterForm();
    this.subscribeFilters();
    this.createFilterDateForm();

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
    if(  this.statuses.find(s => s.name === "Notified").id 
        < this.statuses.find(s => s.name === "Accepted").id) {
          this.dataSource.data.sort((a, b) => (a.statusId < b.statusId ? -1 : 0));
        }
        else {
          this.dataSource.data.sort((a, b) => (a.statusId > b.statusId ? -1 : 0));
        }
  this.dataSource._updateChangeSubscription();
    

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

  // to accept it
  onAccept(report: IReportData) {}

  // to decline it
  // IMPLEMENT NEW DECLINE DIALOG WINDOW with description of decline by email
  onDecline(report: IReportData) {}

  getStatusById(id: number) {
    return this.statuses.find(status => status.id == id).name;
  }

  getProjectById(id: number) {
    return this.projects.find(project => project.id == id).name;
  }

  getTaskById(id: number) {
    return this.tasks.find(task => task.id == id).name;
  }

  getUserNameById(id: number) {
    return (
      this.users.find(user => user.id == id).name +
      " " +
      this.users.find(user => user.id == id).surname
    );
  }
}
