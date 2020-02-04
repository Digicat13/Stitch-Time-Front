import { Component, OnInit } from "@angular/core";
import { IReportData } from "src/app/interfaces/report-data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as moment from "moment";
import { ReportHttpService } from "src/app/services/report-http.service";

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

  constructor(private reportHttpService: ReportHttpService) {}

  ngOnInit() {
    this.reportForm = new FormGroup({
      projectControl: new FormControl(null, Validators.required),
      taskControl: new FormControl(null, Validators.required),
      timeControl: new FormControl(null, Validators.required),
      overtimeControl: new FormControl(null, Validators.required),
      descriptionControl: new FormControl(null, Validators.required),
      startDateControl: new FormControl(null, Validators.required),
      endDateControl: new FormControl(null, Validators.required)
    });

    this.resetFormTimeDate();
  }

  // pushing new report to array
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

    // pushing into local array, sending request
    this.reports.push(reportData);
    this.reportHttpService.postReport(reportData).subscribe(
      (data: IReportData) => {
        console.log(data);
      },
      error => console.log(error)
    );

    // reseting form
    this.reportForm.reset();
    this.resetFormTimeDate();
  }

  // converting string "00:00" to date format with default date
  // (to take hours and minutes)
  timeToDate(time: string) {
    time = time === null ? "00:00" : time;
    const date = "2020-02-08";
    const today = moment(date + " " + time);
    return today;
  }

  // delete current report from array, set its values on form
  onEditReport(report: IReportData) {
    this.reportForm.reset();
    const time: string = this.getTimeString(
      report.time.hours,
      report.time.minutes
    );
    const overtime: string = this.getTimeString(
      report.overtime.hours,
      report.overtime.minutes
    );

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

  // change report status
  onNotify(report: IReportData) {
    const index: number = this.reports.indexOf(report);
    if (index !== -1) {
      this.reports[index].status = "notified";
    }
  }

  // patching default values(html value doesnt work)
  resetFormTimeDate() {
    const date = moment().format("YYYY-MM-DD");
    this.reportForm.patchValue({ timeControl: "01:00" });
    this.reportForm.patchValue({ overtimeControl: "00:00" });
    this.reportForm.patchValue({ startDateControl: date });
    this.reportForm.patchValue({ endDateControl: date });
  }

  getTimeString(hours: number, minutes: number) {
    const hour: string = hours < 10 ? "0" + hours : "" + hours;
    const min: string = minutes < 10 ? "0" + minutes : "" + minutes;
    const time: string = hour + ":" + min;
    return time;
  }

  
onGet() {
  this.reportHttpService.getData().subscribe((data)=>console.log(data));
}

}
