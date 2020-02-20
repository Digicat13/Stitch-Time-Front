import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { IProjectData } from "src/app/interfaces/project-data";
import { ProjectForPMService } from "src/app/services/project-4-pm.service";
import { IUserData } from "src/app/interfaces/user-data";

@Component({
  selector: "app-project-info-dialog",
  templateUrl: "./project-info-dialog.component.html",
  styleUrls: ["./project-info-dialog.component.scss"]
})
export class ProjectInfoDialogComponent implements OnInit {
  project: IProjectData;
  // teamLead: IUserData;
  developers: Array<IUserData>;

  constructor(
    public dialogRef: MatDialogRef<ProjectInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public projectData: IProjectData,
    private pmInfoSErvice: ProjectForPMService
  ) {}

  ngOnInit() {
    console.log(this.projectData);
    this.project = this.projectData;
    console.log(this.project);

    this.pmInfoSErvice.getProjectsList().subscribe(
      responseData => {
        this.developers = responseData.users;
      },
      error => alert(error)
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getDevFullNameById(id: string) {
    return (
      this.developers.find(dev => dev.id === id).firstName +
      " " +
      this.developers.find(dev => dev.id === id).secondName
    );
  }

  getDevEmailById(id: string) {
    return this.developers.find(dev => dev.id === id).email;
  }
}
