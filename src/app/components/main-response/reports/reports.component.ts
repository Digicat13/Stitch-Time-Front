import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';
import { IReportData } from 'src/app/interfaces/report-data';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
reports: IReportData[];


constructor() {}

ngOnInit() {

}

onCreateReportTemplate() {
const report = {
  sender: 'dev',
  project: 'edu',
  task: 'testing',
  time: {hours: 3, minutes: 30},
  overtime: {hours: 2, minutes: 0},
  description: 'Creating a report',
  startDate: '13.01.2020',
  endDate: '14.01.2020',
  status: 'opened',
};
this.reports.push(report);
}

}
