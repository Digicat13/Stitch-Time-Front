import { Component, OnInit } from "@angular/core";
import { Time, DatePipe } from "@angular/common";
import { IReportData } from "src/app/interfaces/report-data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DateAdapter, MatDatepicker } from "@angular/material";
import * as moment from "moment";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"]
})
export class ReportsComponent implements OnInit {
  projects: string[] = ["EDU-pr", "MED", "cancerheal", "adasdad"];
  tasks: string[] = ["bug fixing", "testing", "dev", "design"];
  statuses: string[] = ["Opened", "Notified", "Accepted", "Declined"];

  reports: Array<IReportData> = new Array<IReportData>();
  reportForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.reportForm = new FormGroup({
      projectControl: new FormControl(null, Validators.required),
      taskControl: new FormControl(null, Validators.required),
      timeControl: new FormControl(null, Validators.required),
      overtimeControl: new FormControl(null, Validators.required),
      descriptionControl: new FormControl(null, Validators.required),
      startDateControl: new FormControl(null, Validators.required),
      endDateControl: new FormControl(null, Validators.required),
      statusControl: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const timeDate = this.timeToDate(this.reportForm.get("timeControl").value);
    const overtimeDate = this.timeToDate(
      this.reportForm.get("overtimeControl").value
    );

    const reportData: IReportData = {
      project: this.reportForm.get("projectControl").value,
      task: this.reportForm.get("taskControl").value,
      time: { hours: timeDate.hours(), minutes: timeDate.minutes() },
      overtime: {
        hours: overtimeDate.hours(),
        minutes: overtimeDate.minutes()
      },
      description: this.reportForm.get("descriptionControl").value,
      startDate: this.reportForm.get("startDateControl").value,
      endDate: this.reportForm.get("endDateControl").value,
      status: "opened"
    };

    this.reports.push(reportData);
    this.reportForm.reset();
  }

  onCreateReportTemplate() {
    const report: IReportData = {
      sender: "dev",
      project: "edu",
      task: "testing",
      time: { hours: 3, minutes: 30 },
      overtime: { hours: 2, minutes: 0 },
      description: "Creating a report",
      startDate: "13.01.2020",
      endDate: "14.01.2020",
      status: "approved"
    };
    this.reports.push(report);
  }

  timeToDate(time: string) {
    time = time === null ? "00:00" : time;
    const date = "2020-02-08";
    const today = moment(date + " " + time);
    return today;
  }

  onEditReport(report: IReportData) {
    this.reportForm.reset();
    const time: string = report.time.hours + ":" + report.time.minutes;
    const overtime: string =
      report.overtime.hours + ":" + report.overtime.minutes;

    this.reportForm.patchValue({ projectControl: report.project });
    this.reportForm.patchValue({ taskControl: report.task });
    this.reportForm.patchValue({ timeControl: time });
    this.reportForm.patchValue({ overtimeControl: overtime });
    this.reportForm.patchValue({ descriptionControl: report.description });
    this.reportForm.patchValue({ startDateControl: report.startDate });
    this.reportForm.patchValue({ endDateControl: report.endDate });

    const index: number = this.reports.indexOf(report);
    if (index !== -1) {
      this.reports.splice(index, 1);
    }
  }

  onNotify(report: IReportData) {
    const index: number = this.reports.indexOf(report);
    if (index !== -1) {
      this.reports[index].status="notified";
    } 
  }
}
