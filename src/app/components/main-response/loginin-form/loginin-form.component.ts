import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IUserData } from "../../../interfaces/user-data";
import { SignInUpService } from "src/app/services/sign-in-up.service";
import { MatDialog } from "@angular/material";
import { ErrorResponseDialogComponent } from "../error-response-dialog/error-response-dialog.component";
import { LocalStorageService } from "src/app/services/local-storage.service";

@Component({
  selector: "app-loginin-form",
  templateUrl: "./loginin-form.component.html",
  styleUrls: ["./loginin-form.component.scss"]
})
export class LogininFormComponent implements OnInit {
  isLoading = false;
  loginInForm: FormGroup;

  constructor(
    private signInUpService: SignInUpService,
    public dialog: MatDialog,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.loginInForm = new FormGroup({
      userEmail: new FormControl(null, Validators.required),
      userPassword: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const loginInData: IUserData = {
      email: this.loginInForm.get("userEmail").value,
      password: this.loginInForm.get("userPassword").value
    };

    this.isLoading = true;

    this.signInUpService.singIn(loginInData).subscribe(
      responseData => {
        this.isLoading = false;

        this.localStorageService.storeUserDataOnLocalStorage(responseData);
      },
      errorData => {
        this.isLoading = false;

        if (
          errorData.name !== undefined &&
          errorData.name === "HttpErrorResponse"
        ) {
          this.openErrorResponseDialog(errorData.name);
        } else if (errorData.message === "email does not registered") {
          this.getRedBorderEmailInput();
        } else if (
          errorData.message === "incorrect password for this account"
        ) {
          this.getRedBorderPasswordInput();
        }
      }
    );
  }

  getRedBorderEmailInput() {
    this.loginInForm.get("userEmail").setErrors({ doesNotRegistered: true });

    const emailInput = document.getElementsByName("userEmail")[0];
    emailInput.classList.add("red-border");
  }

  getRedBorderPasswordInput() {
    this.loginInForm.get("userPassword").setErrors({ incorrectPassword: true });

    const emailInput = document.getElementsByName("userPassword")[0];
    emailInput.classList.add("red-border");
  }

  openErrorResponseDialog(errorName: string) {
    const dialogRef = this.dialog.open(ErrorResponseDialogComponent, {
      width: "fit-content",
      data: errorName
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
