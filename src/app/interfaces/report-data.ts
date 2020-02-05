import { Time } from '@angular/common';

export interface IReportData {
    userId?: string;
    project?: string;
    task?: string;
    time?: number;
    overtime?: number;
    description?: string;
    startDate?: string;
    endDate?: string;
    status?: string;


  //         projectId: 3,
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

export interface IReports{
    reports: Array<IReportData>;
 }
