import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IProjectData } from "../interfaces/project-data";
import { environment } from "src/environments/environment";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ProjectForPMService {
  apiUrl: string = environment.apiUrl + "/project";

  constructor(private http: HttpClient) {}

  getProjectsList() {
    return this.http
      .get<IProjectData[]>(this.apiUrl)
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
