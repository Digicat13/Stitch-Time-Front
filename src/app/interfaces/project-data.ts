import { IUserData } from "./user-data";

export interface IProjectData {
  id?: number;
  name?: string;
  abbrevation?: string;
  description?: string;
  initialEffort?: number;
  initialRisk?: number;
  projectManagerId?: string;
  teamLeadId?: string;
  team?: ITeam;
}

export interface ITeam {
  id?: number;
  teamLeadId?: string;
  projectId?: number;
  teamMembers?: Array<ITeamMember>;
}

export interface ITeamMember {
  id?: number;
  teamdId?: string;
  userId?: string;
}
