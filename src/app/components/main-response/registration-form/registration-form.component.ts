import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IUserData } from "../../../interfaces/user-data";
import { SignInUpService } from "src/app/services/sign-in-up.service";
import { SignInUpValidator } from "src/app/validators/sign-in-up.validator";
import { SuccessfullyRegisteredDialogComponent } from "../successfully-registered-dialog/successfully-registered-dialog.component";
import { MatDialog } from "@angular/material";
import { ErrorResponseDialogComponent } from "../error-response-dialog/error-response-dialog.component";
import { LocalStorageService } from "src/app/services/local-storage.service";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"]
})
export class RegistrationFormComponent implements OnInit {
  registrationForm: FormGroup;
  emailAlreadyRegistered: boolean = false;
  isLoading: boolean = false;

  constructor(
    private signInUpService: SignInUpService,
    private singInUpValidator: SignInUpValidator,
    public dialog: MatDialog,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.registrationForm = new FormGroup({
      userName: new FormControl(null, [
        Validators.required,
        this.singInUpValidator.nameValidator
      ]),
      userSurname: new FormControl(null, [
        Validators.required,
        this.singInUpValidator.surnameValidator
      ]),
      userEmail: new FormControl(null, [
        Validators.required,
        this.singInUpValidator.emailValidator
      ]),
      passwords: new FormGroup(
        {
          userPassword: new FormControl(null, [
            Validators.required,
            this.singInUpValidator.passwordValidator
          ]),
          userConfirmPassword: new FormControl(null, [Validators.required])
        },
        [Validators.required, this.singInUpValidator.matchPasswordsValidator]
      ),

      userPosition: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    const inputData: IUserData = {
      name: this.registrationForm.get("userName").value,
      surname: this.registrationForm.get("userSurname").value,
      email: this.registrationForm.get("userEmail").value,
      password: this.registrationForm.get("passwords").get("userPassword")
        .value,
      position: this.registrationForm.get("userPosition").value
    };

    this.isLoading = true;

    this.signInUpService.signUp(inputData).subscribe(
      responseUserData => {
        this.isLoading = false;

        // this.localStorageService.storeUserDataOnLocalStorage(responseUserData);

        this.openSuccessfullyRegisteredDialog(
          this.localStorageService.getUserDataFromLocalStorage().name
        );

        // TODO доробити

        this.registrationForm.reset();
      },
      error => {
        this.isLoading = false;

        // TODO сюди треба додати обробку помилки, якщо ще щось сталось, хоча, тут єдиний трабл
        // це як раз або ВЖЕ ЗАРЕЄСТРОВАНИЙ емейл, або ж трабл з підключенням до сервака ;)

        if (
          error.name !== undefined &&
          error.name === "HttpErrorResponse"
        ) {
          this.openErrorResponseDialog(error.name);
        } else {
          this.getRedBorderEmailInput();
        }
      }
    );

    console.log(inputData);
  }

  getRedBorderEmailInput() {
    this.registrationForm
      .get("userEmail")
      .setErrors({ alreadyRegistered: true });

    const emailInput = document.getElementsByName("userEmail")[0];
    emailInput.classList.add("red-border");
  }

  openSuccessfullyRegisteredDialog(userName: string) {
    const dialogRef = this.dialog.open(SuccessfullyRegisteredDialogComponent, {
      width: "fit-content",
      data: userName
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
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
