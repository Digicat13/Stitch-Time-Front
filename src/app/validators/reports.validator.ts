import { FormControl, FormGroup } from "@angular/forms";

// to do
export class ReportValidator {
  startDateValidation(startDateInput: FormControl): { [s: string]: boolean } {
    let currentDate = new Date(new Date().toDateString());

    if (startDateInput.value !== null && startDateInput !== undefined) {
      let inputDate = new Date(new Date(startDateInput.value).toDateString());
      if (currentDate > inputDate || currentDate.toDateString() === inputDate.toDateString() ) {
        return null;
      }
      return { incorrectStartDate: true };
    }
  }
}
