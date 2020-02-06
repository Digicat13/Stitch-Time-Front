import { Component, OnInit, ViewChild } from "@angular/core";
import { IReportData } from "src/app/interfaces/report-data";
import { MatTableDataSource, MatPaginator } from '@angular/material';


const REPORT_DATA: IReportData[] = [
  {
    projectId: 3,
    assignmentId: 1,
    description: "sdadasdasdasdd",
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
    description: "ssdasdsad",
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
  selector: "app-reports-table",
  templateUrl: "./reports-table.component.html",
  styleUrls: ["./reports-table.component.scss"]
})

export class ReportsTableComponent implements OnInit {
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

  dataSource = new MatTableDataSource<IReportData>(REPORT_DATA);

  @ViewChild(MatPaginator, {static: true} ) paginator: MatPaginator;

  constructor() {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
