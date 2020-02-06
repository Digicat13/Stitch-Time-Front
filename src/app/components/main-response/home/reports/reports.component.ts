import { Component, OnInit } from "@angular/core";
import {
  IReportData,
  IProject,
  IAssignment,
  IStatus
} from "src/app/interfaces/report-data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as moment from "moment";
import { ReportHttpService } from "src/app/services/report-http.service";
import { Time } from "@angular/common";
import "bootstrap/dist/js/bootstrap.bundle";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"]
})
export class ReportsComponent implements OnInit {
  // projects: string[] = ["EDU-pr", "MED", "cancerheal", "adasdad"];
  // tasks: string[] = ["bug fixing", "testing", "dev", "design"];
  // statuses: string[] = ["Opened", "Notified", "Accepted", "Declined"];

  projects: Array<IProject> = [
    { id: 1, name: "EDU-pr", projectManagerId: 5 },
    { id: 3, name: "MED", projectManagerId: 5 },
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
    { id: 1, name: "Opened" },
    { id: 2, name: "Notified" },
    { id: 3, name: "Accepted" },
    { id: 4, name: "Declined" }
  ];

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
    const reportData: IReportData = {
      projectId: this.reportForm.get("projectControl").value,
      assignmentId: this.reportForm.get("taskControl").value,
      time: this.reportForm.get("timeControl").value,
      overtime: this.reportForm.get("overtimeControl").value,
      description: this.reportForm.get("descriptionControl").value,
      startDate: this.reportForm.get("startDateControl").value,
      endDate: this.reportForm.get("endDateControl").value,
      statusId: this.statuses.find(status => status.name === "Opened").id
    };

    // pushing into local array, sending request
    this.reports.push(reportData);

    // posting data
    // this.reportHttpService.postData(reportData).subscribe(
    //   (data: IReportData) => {
    //     console.log(data);
    //   },
    //   error => console.log(error)
    // );

    // reseting form
    this.reportForm.reset();
    this.resetFormTimeDate();
  }

  // delete current report from array, set its values on form
  onEdit(report: IReportData) {
    this.reportForm.reset();

    this.reportForm.patchValue({ projectControl: report.projectId });
    this.reportForm.patchValue({ taskControl: report.assignmentId });
    this.reportForm.patchValue({ timeControl: report.time });
    this.reportForm.patchValue({ overtimeControl: report.overtime });
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
      this.reports[index].statusId = this.statuses.find(
        status => status.name === "Notified"
      ).id;
    }
  }

  // patching default values(html value doesnt work)
  resetFormTimeDate() {
    const date = moment().format("YYYY-MM-DD");
    this.reportForm.patchValue({ timeControl: "1.0" });
    this.reportForm.patchValue({ overtimeControl: "0" });
    this.reportForm.patchValue({ startDateControl: date });
    this.reportForm.patchValue({ endDateControl: date });
  }

  onGet() {
    this.reportHttpService.getData().subscribe(data => {
      console.log(data);
      this.reports = data;
    });
  }

  onDelete(report: IReportData) {
    if (!report.id) {
      alert("Report id is" + report.id);
    } else {
      this.reportHttpService.deleteData(report.id).subscribe(
        (data: IReportData) => {
          console.log(data);
        },
        error => console.log(error)
      );
    }
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
}
