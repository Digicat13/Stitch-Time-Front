import { FormControl } from "@angular/forms";

export class SignInUpValidator {
  nameValidator(control: FormControl): { [key: string]: boolean } {
    if (control !== null) {
      let name: string = control.value;

      if (name !== null) {
        name = name.trim();
        const regex: RegExp = /^[A-Z][a-z]{0,}$/;
        const isContains = regex.test(name);
        if (isContains) {
          document
            .getElementsByName("userName")[0]
            .classList.remove("red-border");

          return null;
        }
        document.getElementsByName("userName")[0].classList.add("red-border");

        return { incorrectName: true };
      }
    }
  }

  surnameValidator(control: FormControl): { [key: string]: boolean } {
    if (control !== null) {
      let surname: string = control.value;

      if (surname !== null) {
        surname = surname.trim();
        const regex: RegExp = /^[A-Z][a-z]{0,}$/;
        const isContains = regex.test(surname);
        if (isContains) {
          document
            .getElementsByName("userSurname")[0]
            .classList.remove("red-border");

          return null;
        }
        document
          .getElementsByName("userSurname")[0]
          .classList.add("red-border");

        return { incorrectSurname: true };
      }
    }
  }

  emailValidator(control: FormControl): { [key: string]: boolean } {
    if (control !== null) {
      let email: string = control.value;

      if (email !== null) {
        email = email.trim();
        const regex: RegExp = /^[a-z0-9]{0,}@gmail.com$/;
        const isContains = regex.test(email);
        if (isContains) {
          document
            .getElementsByName("userEmail")[0]
            .classList.remove("red-border");

          return null;
        }
        document
          .getElementsByName("userEmail")[0]
          .classList.add("red-border");

        return { incorrectEmail: true };
      }
    }
  }
}
