import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IProjectData } from "../interfaces/project-data";
import { environment } from "src/environments/environment";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { IProject, IReportData } from "../interfaces/report-data";
import { IUserData } from "../interfaces/user-data";

interface IProjectPmInfo {
  projects: Array<IProjectData>;
  users: Array<IUserData>;
}

interface IPmReportInfo {
  projects: Array<IProject>;
  pmDevelopers: Array<IUserData>;
  developersReports: Array<IReportData>;
}

interface ITeamLeadInfo {
  users: Array<IUserData>;
  usersReports: Array<IReportData>;
  projects: Array<IProject>;
}

@Injectable()
export class ProjectForPMService {
  apiUrl: string = environment.apiUrl + "/Project";
  id: string = JSON.parse(localStorage.getItem("userData")).id;

  constructor(private http: HttpClient) {}

  getProjectsList() {
    return this.http
      .get<IProjectPmInfo>(
        environment.apiUrl +
          "/User/GetPmProjectsInfo/" +
          JSON.parse(localStorage.getItem("userData")).id
      )
      .pipe(catchError(this.errorHandling));
  }

  setNewProject(project: IProjectData) {
    return this.http
      .post<IProjectData>(this.apiUrl, project)
      .pipe(catchError(this.errorHandling));
  }

  deleteProject(project: IProjectData) {
    return this.http
      .delete(this.apiUrl + "/" + project.id)
      .pipe(catchError(this.errorHandling));
  }

  getProject(id: number) {
    return this.http
      .get<IProjectData>(environment.apiUrl + "/project/" + id)
      .pipe(catchError(this.errorHandling));
  }

  getReportsForPm(id: string) {
    return this.http
      .get<IPmReportInfo>(environment.apiUrl + "/User/GetPmReportsInfo/" + id)
      .pipe(catchError(this.errorHandling));
  }

  getReportsForTeamLead(id: string) {
    return this.http
      .get<ITeamLeadInfo>(environment.apiUrl + "/User/GetTeamLeadInfo/" + id)
      .pipe(catchError(this.errorHandling));
  }

  acceptedReport(report: IReportData) {
    return this.http.put<IReportData>(
      environment.apiUrl + "/Report/Accept",
      report
    );
  }

  declinedReport(report: IReportData) {
    return this.http.put<IReportData>(
      environment.apiUrl + "/Report/Decline",
      report
    );
  }

  private errorHandling(errorResponse: HttpErrorResponse) {
    if (
      errorResponse.name !== undefined &&
      errorResponse.name === "HttpErrorResponse"
    ) {
      return throwError({
        name: errorResponse.name,
        message: errorResponse.message
      });
    }
    return throwError(errorResponse.message);
  }
}
