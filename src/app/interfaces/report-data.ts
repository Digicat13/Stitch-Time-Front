import { Time } from '@angular/common';

export interface IReportData {
    sender?: string;
    project?: string;
    task?: string;
    time?: Time;
    overtime?: Time;
    description?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
  }
