import { IProjectData } from './project-data';
import { IReportData } from './report-data';

export interface IUserData {
  id?: string;
  firstName?: string;
  secondName?: string;
  email?: string;
  password?: string;
  positionId?: number;
}

export interface IFullUserData {
  user: IUserData;
  position: { id: number, positionName: string};
  projects: Array<IProjectData>;
  reports: Array<IReportData>;
}
