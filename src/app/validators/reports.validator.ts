import { FormControl, FormGroup } from "@angular/forms";
import { IReportData } from "../interfaces/report-data";

// to do
export class ReportValidator {
  startDateValidation(startDateInput: FormControl): { [s: string]: boolean } {
    let currentDate = new Date(new Date().toDateString());

    if (startDateInput.value !== null && startDateInput !== undefined) {
      let inputDate = new Date(new Date(startDateInput.value).toDateString());
      if (
        currentDate > inputDate ||
        currentDate.toDateString() === inputDate.toDateString()
      ) {
        return null;
      }
      return { incorrectStartDate: true };
    }
  }

  timePerDayValidator(reports: IReportData[], report: IReportData) {
    let sum: number = 0;
    const limit: number = 8; 
    reports.filter(elem => elem.startDate==report.startDate).
    forEach(r => (sum += r.time));
    sum += report.time;
    return sum <=limit;
  }
}
