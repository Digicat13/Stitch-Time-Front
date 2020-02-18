import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IReportData, IReports } from "../interfaces/report-data";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class ReportHttpService {
  constructor(private http: HttpClient) {}

  apiUrl: string = environment.apiUrl + '/report';

  postData(reportData: IReportData) {
    return this.http.post<IReportData>(this.apiUrl, reportData);
  }

  getData(id: string) {
    return this.http.get<IReportData[]>(this.apiUrl+'/GetReports/'+ id);
  }

  putData(report: IReportData, id) {
    return this.http.put(this.apiUrl + "/" +  id , report);
  }

  patchData(report: IReportData, id) {
    return this.http.patch(this.apiUrl + "/" +  id , report);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete<IReportData>(this.apiUrl + "/" +  id );
  }
}
