import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IReportData, IReports } from "../interfaces/report-data";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class ReportHttpService {
  constructor(private http: HttpClient) {}

  apiUrl: string = environment.apiUrl + '/Report';

  postData(reportData: IReportData) {
    // maybe better just send reportData, without creating new object
    // new object will be needed  if there will be changes
    // now it is useless
    // const body = {
    //   projectId: 3,
    //   assignmentId: 1,
    //   description: "lol",
    //   time: 1,
    //   overtime: 0,
    //   startDate: "2020-02-04",
    //   endDate: "2020-02-04",
    //   userId: 2,
    //   statusId: 1
    // };
    // console.log(body);
    console.log(reportData);

    return this.http.post<IReportData>(this.apiUrl, reportData);
  }

  getData() {
    return this.http.get<IReportData[]>(this.apiUrl);
  }

  putData(report: IReportData, id) {
    const body = {
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


    return this.http.put(this.apiUrl + "/" +  id , report);
  }

  patchData(report: IReportData, id) {
    return this.http.patch(this.apiUrl + "/" +  id , report);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete<IReportData>(this.apiUrl + "/" +  id );

  }
}
