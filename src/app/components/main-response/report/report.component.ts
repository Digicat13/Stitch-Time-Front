import { Component, OnInit, Input } from '@angular/core';
import { IReportData } from 'src/app/interfaces/report-data';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  @Input() report: IReportData;

  constructor() { }

  ngOnInit() {

  }

  createBaseReport() {
    this.report = {
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
  }

  getReportSender() {
    return this.report.sender;
  }
  getReportProject() {
    return this.report.project;
  }
  getReportTask() {
    return this.report.task;
  }
  getReportTime() {
    return this.report.time;
  }
  getReportOvertime() {
    return this.report.overtime;
  }
  getReportDescription() {
    return this.report.description;
  }
  getReportStartDate() {
    return this.report.startDate;
  }
  getReportEndDate() {
    return this.report.endDate;
  }
  getReportStatus() {
    return this.report.status;
  }

}
