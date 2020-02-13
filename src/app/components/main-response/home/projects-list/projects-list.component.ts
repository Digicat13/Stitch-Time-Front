import { Component, OnInit } from "@angular/core";
import { IProjectData } from "src/app/interfaces/project-data";
import { MatTableDataSource, MatDialog } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IUserData } from "src/app/interfaces/user-data";
import { ProjectForPMService } from "src/app/services/project-4-pm.service";
import { IsPageLoading } from "src/app/services/is-loading-emitter.service";
import { ErrorResponseDialogComponent } from "../../error-response-dialog/error-response-dialog.component";

const PROJECT_DATA: Array<IProjectData> = [
  {
    id: 1,
    name: "Recl dry motor",
    abbreviation: "RDM",
    projectManagerId: 1,
    teamleadId: 1,
    teamleadName: "Francisco",
    teamleadSurname: "Smit",
    teammates: [{ id: 1, name: "Daniil", surname: "Shlive" }]
  },
  {
    id: 2,
    name: "AlcoKer",
    abbreviation: "AK",
    projectManagerId: 1,
    teamleadId: 1,
    teamleadName: "Francisco",
    teamleadSurname: "Smit",
    teammates: [{ id: 1, name: "Daniil", surname: "Shlive" }]
  },
  {
    id: 3,
    name: "Mango",
    abbreviation: "MNG",
    projectManagerId: 1,
    teamleadId: 1,
    teamleadName: "Francisco",
    teamleadSurname: "Smit",
    teammates: [{ id: 1, name: "Daniil", surname: "Shlive" }]
  }
];

@Component({
  selector: "app-projects-list",
  templateUrl: "./projects-list.component.html",
  styleUrls: ["./projects-list.component.scss"]
})
export class ProjectsListComponent implements OnInit {
  displayedColumns: string[] = ["abbr", "name", "teamleadName", "actions"];

  developers: Array<IUserData> = [
    { id: 1, name: "Daniil", surname: "Shlive" },
    { id: 2, name: "Denis", surname: "Shlive" },
    { id: 3, name: "Francisco", surname: "Dantes" },
    { id: 4, name: "Will", surname: "Smit" },
    { id: 5, name: "David", surname: "Pozhar" }
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
      Validators.maxLength(15),
      // Validators.pattern(/^[0-9a-zA-Z]{1,15}$/)

    ]),
    projectAbbreviation: new FormControl(null, [
      Validators.required,
      Validators.maxLength(6),
      // Validators.pattern(/^[0-9A-Z]{1,6}$/)
    ]),
    description: new FormControl(null, [
      Validators.required,
      Validators.maxLength(25)
    ]),
    teamlead: new FormControl(null, [Validators.required]),
    teammates: new FormControl(null, [Validators.required])
  });

  constructor(
    private projectService: ProjectForPMService,
    private dialog: MatDialog,
    private pageLoading: IsPageLoading
  ) {}

  ngOnInit() {
    this.onGet();
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
    this.pageLoading.isLoading.next(true);
    if (
      this.projectForm
        .get("teammates")
        .value.indexOf(this.projectForm.get("teamlead").value) === -1
    ) {
      alert(
        "You foggot something! Please, select your teamlead as a team member!)"
      );
    }
  }

  private onGet() {
    this.pageLoading.isLoading.next(true);
    this.projectService.getProjectsList().subscribe(
      responseData => {
        this.pageLoading.isLoading.next(false);

        this.projects = responseData;
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
