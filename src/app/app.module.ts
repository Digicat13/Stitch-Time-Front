import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatDialogModule,
  MatFormFieldModule,
  MatNativeDateModule
} from "@angular/material";
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

const appRoutes: Routes = [
  { path: "", component: LogininFormComponent },
  { path: "registration", component: RegistrationFormComponent },
  { path: "home", component: HomeComponent }
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
    ReportsComponent
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
    MatNativeDateModule
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
    IsPageLoading
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
