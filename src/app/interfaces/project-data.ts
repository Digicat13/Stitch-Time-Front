import { IUserData } from './user-data';

export interface IProjectData {
  id?: number;
  name: string;
  abbreviation: string;
  projectManagerId: number;
  teamleadId?: number;
  teamleadName?: string;
  teamleadSurname?: string;
  teammates?: Array<IUserData>;
}

