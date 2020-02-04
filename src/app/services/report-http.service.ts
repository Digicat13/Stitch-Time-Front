import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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

    const postData = {
      // sender: reportData.sender,
      // project: reportData.project,
      // task: reportData.task,
      // status: reportData.status,

      // projectId: 3,
      // assignmentId: 1,
      // description: reportData.description,
      // time: reportData.time,
      // overtime: reportData.overtime,
      // startDate: reportData.startDate,
      // endDate: reportData.endDate,
      // userId: 7,
      // statusId: 4

        projectId: 3,
        assignmentId: 1,
        description: "lol",
        time: 0,
        overtime: 0,
        startDate: "2020-02-04T17:43:53.491Z",
        endDate: "2020-02-04T17:43:53.491Z",
        userId: 7,
        statusId: 4

    };

    // console.log(postData);

    return this.http.post<IReportData>(
      environment.apiUrl + '/Report',
      postData
    );
  }

  getData() {
// const myHeaders = new HttpHeaders().set('accept', 'text/plain');

return this.http.get(environment.apiUrl + '/Report');
  }


}
