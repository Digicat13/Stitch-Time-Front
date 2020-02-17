import { Time } from "@angular/common";

export interface IReportData {
  id?: number;
  projectId?: number;
  assignmentId?: number;
  description?: string;
  time?: number;
  overtime?: number;
  startDate?: string;
  endDate?: string;
  userId?: string;
  statusId?: number;

  //     projectId: 3,
  //     assignmentId: 1,
  //     description: "lol",
  //     time: 0,
  //     overtime: 0,
  //     startDate: "2020-02-04T17:43:53.491Z",
  //     endDate: "2020-02-04T17:43:53.491Z",
  //     userId: 7,
  //     statusId: 4
  // }
}

export interface IReports {
  reports: Array<IReportData>;
}

export interface IAssignment {
  id: number;
  name: string;
}

export interface IProject {
  id: number;
  name: string;
  projectManagerId: number;
}

export interface IStatus {
  id: number;
  name: string;
}


export interface IPosition {
  id: number;
  name: string;
}