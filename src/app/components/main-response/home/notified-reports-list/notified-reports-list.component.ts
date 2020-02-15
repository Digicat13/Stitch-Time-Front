import { Component, OnInit, ViewChild } from "@angular/core";
import {
  IReportData,
  IStatus,
  IAssignment,
  IProject
} from "src/app/interfaces/report-data";
import { MatTableDataSource, MatPaginator } from "@angular/material";

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
  selector: "app-notified-reports-list",
  templateUrl: "./notified-reports-list.component.html",
  styleUrls: ["./notified-reports-list.component.scss"]
})
export class NotifiedReportsListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = [
    "abbr",
    "task",
    "time",
    "overtime",
    "description",
    "startDate",
    "endDate",
    "actions"
  ];

  statuses: Array<IStatus> = [
    { id: 1, name: "Opened" },
    { id: 2, name: "Notified" },
    { id: 3, name: "Accepted" },
    { id: 4, name: "Declined" }
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

  reports: Array<IReportData> = new Array<IReportData>();

  // dataSourse here is source for table - observable
  dataSource = new MatTableDataSource<IReportData>(REPORT_DATA);
  // dataSource = new MatTableDataSource<IReportData>(this.reports);

  constructor() {}

  // TODO write & implement notified reports service
  // to get all notified reports
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
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
}
