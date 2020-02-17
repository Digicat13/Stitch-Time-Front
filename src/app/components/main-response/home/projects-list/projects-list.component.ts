import { Component, OnInit, ViewChild } from "@angular/core";
import { IProjectData, ITeamMember } from "src/app/interfaces/project-data";
import { MatTableDataSource, MatDialog, MatPaginator } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IUserData } from "src/app/interfaces/user-data";
import { ProjectForPMService } from "src/app/services/project-4-pm.service";
import { IsPageLoading } from "src/app/services/is-loading-emitter.service";
import { ErrorResponseDialogComponent } from "../../error-response-dialog/error-response-dialog.component";
import { IProject } from "src/app/interfaces/report-data";

const PROJECT_DATA: Array<IProjectData> = [
  // {
  //   id: 1,
  //   name: "Recl dry motor",
  //   abbreviation: "RDM",
  //   projectManagerId: 1,
  //   teamLeadId: 1,
  //   teamLeadName: "Francisco",
  //   teamLeadSurname: "Smit",
  //   teamMates: [{ id: "1", firstName: "Daniil", secondName: "Shlive" }]
  // },
  // {
  //   id: 2,
  //   name: "AlcoKer",
  //   abbreviation: "AK",
  //   projectManagerId: 1,
  //   teamLeadId: 1,
  //   teamLeadName: "Francisco",
  //   teamLeadSurname: "Smit",
  //   teamMates: [{ id: "1", firstName: "Daniil", secondName: "Shlive" }]
  // },
  // {
  //   id: 3,
  //   name: "Mango",
  //   abbreviation: "MNG",
  //   projectManagerId: '1',
  //   teamLeadId: '1',
  //   teamMates: [{ id: "1", firstName: "Daniil", secondName: "Shlive" }]
  // }
];

@Component({
  selector: "app-projects-list",
  templateUrl: "./projects-list.component.html",
  styleUrls: ["./projects-list.component.scss"]
})
export class ProjectsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ["abbr", "name", "teamleadName", "actions"];

  developers: Array<IUserData> = [
    { id: "1", firstName: "Daniil", secondName: "Shlive" },
    { id: "2", firstName: "Denis", secondName: "Shlive" },
    { id: "3", firstName: "Francisco", secondName: "Dantes" },
    { id: "4", firstName: "Will", secondName: "Smit" },
    { id: "5", firstName: "David", secondName: "Pozhar" }
  ];

  isEdited = false;
  currentProjectId: number;
  currentProjectIndex: number;

  projects: Array<IProjectData> = new Array<IProjectData>();

  // dataSourse here is source for table - observable
  dataSource = new MatTableDataSource<IProjectData>(PROJECT_DATA);
  // dataSource = new MatTableDataSource<IProjectData>(this.projects);

  projectForm = new FormGroup({
    projectName: new FormControl(null, [
      Validators.required,
      Validators.maxLength(15)
      // Validators.pattern(/^[0-9a-zA-Z]{1,15}$/)
    ]),
    projectAbbreviation: new FormControl(null, [
      Validators.required,
      Validators.maxLength(6)
      // Validators.pattern(/^[0-9A-Z]{1,6}$/)
    ]),
    description: new FormControl(null, [
      Validators.required,
      Validators.maxLength(25)
    ]),
    teamlead: new FormControl(null, [Validators.required]),
    teammates: new FormControl(null, [Validators.required]),
    effort: new FormControl(null, Validators.required),
    risk: new FormControl(null, Validators.required)
  });

  constructor(
    private projectService: ProjectForPMService,
    private dialog: MatDialog,
    private pageLoading: IsPageLoading
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.onGet();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(project: IProjectData) {
    if (project.id !== undefined) {
      this.pageLoading.isLoading.next(true);
      this.projectService.deleteProject(project).subscribe(
        responseData => {
          this.pageLoading.isLoading.next(false);
        },
        errorData => {
          this.pageLoading.isLoading.next(false);
          if (errorData.name === "HttpErrorResponse") {
            this.openErrorResponseDialog(errorData.message);
          }
        }
      );
    }
  }

  onSubmit() {
    if (
      this.projectForm
        .get("teammates")
        .value.indexOf(this.projectForm.get("teamlead").value) === -1
    ) {
      alert(
        "You foggot something! Please, select your teamlead as a team member!)"
      );
      return;
    }

    this.pageLoading.isLoading.next(true);

    let teamMembers: Array<ITeamMember> = [];
    for (let i = 0; i < this.projectForm.get("teammates").value.length; i++) {
      teamMembers.push({ userId: this.projectForm.get("teammates").value[i] });
    }

    const projectData: IProjectData = {
      name: this.projectForm.get("projectName").value,
      abbrevation: this.projectForm.get("projectAbbreviation").value,
      description: this.projectForm.get("description").value,
      initialEffort: this.projectForm.get("effort").value,
      initialRisk: this.projectForm.get("risk").value,
      projectManagerId: JSON.parse(localStorage.getItem("userData")).id,
      teamLeadId: this.projectForm.get("teamlead").value,
      team: {
        teamLeadId: this.projectForm.get("teamlead").value,
        teamMembers: teamMembers
      }
    };

    console.log(projectData);
    this.projectService.setNewProject(projectData).subscribe(
      responseData => {
    this.pageLoading.isLoading.next(false);

        console.log(responseData);
      },
      error => {
    this.pageLoading.isLoading.next(false);
console.log('blyaha');
        console.log(error);
      }
    );
  }

  private onGet() {
    this.pageLoading.isLoading.next(true);
    this.projectService.getProjectsList().subscribe(
      responseData => {
        console.log(responseData);
        this.pageLoading.isLoading.next(false);
        this.projects = responseData.projects;
        this.developers = responseData.users;
        this.dataSource.data = this.projects;
      },
      errorData => {
        this.pageLoading.isLoading.next(false);
        if (errorData.name === "HttpErrorResponse") {
          this.openErrorResponseDialog(errorData.message);
        }
      }
    );
  }

  private openErrorResponseDialog(errorName: string) {
    const dialogRef = this.dialog.open(ErrorResponseDialogComponent, {
      width: "fit-content",
      data: errorName
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
