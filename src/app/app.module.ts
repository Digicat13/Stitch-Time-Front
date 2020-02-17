import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule, MatFormFieldModule, MatNativeDateModule, MatTableModule, MatPaginatorModule, MatInputModule, MatMenuModule, MatTooltipModule, MatSelectModule, MatButtonModule, MatCheckboxModule } from "@angular/material";
import { StorageServiceModule } from "ngx-webstorage-service";
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "./components/app/app.component";
import { HeaderComponent } from "./components/header/header.component";
import { MainResponseComponent } from "./components/main-response/main-response.component";
import { RegistrationFormComponent } from "./components/main-response/registration-form/registration-form.component";
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { SignInUpService } from "./services/sign-in-up.service";
import { SignInUpValidator } from "./validators/sign-in-up.validator";
import { SuccessfullyRegisteredDialogComponent } from "./components/main-response/successfully-registered-dialog/successfully-registered-dialog.component";
import { ErrorResponseDialogComponent } from "./components/main-response/error-response-dialog/error-response-dialog.component";
import { LocalStorageService } from "./services/local-storage.service";
import { LogininFormComponent } from "./components/main-response/loginin-form/loginin-form.component";
import { HomeComponent } from "./components/main-response/home/home.component";
import { ReportsComponent } from "./components/main-response/home/reports/reports.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ReportHttpService } from "./services/report-http.service";
import { ReportValidator } from "./validators/reports.validator";
import { IsPageLoading } from "./services/is-loading-emitter.service";
import { WelcomePageComponent } from './components/main-response/welcome-page/welcome-page.component';
import { FilterTableService } from './services/filter-table..service';
import { NotifiedReportsListComponent } from './components/main-response/home/notified-reports-list/notified-reports-list.component';
import { ProjectsListComponent } from './components/main-response/home/projects-list/projects-list.component';
import { ProjectForPMService } from './services/project-4-pm.service';
import { NotifiedReportsService } from './services/notified-reports.service';
import { AuthGuard } from './services/auth.guard';

const appRoutes: Routes = [
  { path: "", component: WelcomePageComponent },
  { path: "login", component: LogininFormComponent },
  { path: "registration", component: RegistrationFormComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] , children: [
    {path: "reportslist" , component: ReportsComponent},
    {path: "projectslist", component: ProjectsListComponent},
    {path: "notifiedreports", component: NotifiedReportsListComponent }
  ] }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainResponseComponent,
    RegistrationFormComponent,
    LoadingSpinnerComponent,
    SuccessfullyRegisteredDialogComponent,
    ErrorResponseDialogComponent,
    LogininFormComponent,
    HomeComponent,
    ReportsComponent,
    WelcomePageComponent,
    ProjectsListComponent,
    NotifiedReportsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    StorageServiceModule,
    RouterModule.forRoot(appRoutes),
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  entryComponents: [
    SuccessfullyRegisteredDialogComponent,
    ErrorResponseDialogComponent
  ],
  providers: [
    SignInUpService,
    SignInUpValidator,
    LocalStorageService,
    ReportHttpService,
    ReportValidator,
    IsPageLoading,
    FilterTableService,
    ProjectForPMService,
    NotifiedReportsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
