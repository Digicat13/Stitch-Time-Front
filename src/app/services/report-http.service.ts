import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IReportData } from "../interfaces/report-data";
import { environment } from "../../environments/environment";

@Injectable()
export class ReportHttpService {
  constructor(private http: HttpClient) {}

  // serverUrl: string = environment.apiUrl + "/reports";

  postReport(reportData: IReportData) {
    // maybe better just send reportData, without creating new object
    // new object will be needed  if there will be changes
    // now it is useless

    // const postData = {
    //   sender: reportData.sender,
    //   project: reportData.project,
    //   task: reportData.task,
    //   time: reportData.time,
    //   overtime: reportData.overtime,
    //   description: reportData.description,
    //   startDate: reportData.startDate,
    //   endDate: reportData.endDate,
    //   status: reportData.status
    // };
    
    return this.http.post<IReportData>(
      environment.apiUrl + "/reports",
      reportData
    );
  }
}
