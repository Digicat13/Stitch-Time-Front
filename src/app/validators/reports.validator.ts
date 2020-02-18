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

  timePerDayValidator(
    reports: IReportData[],
    report: IReportData,
    idEdited: boolean
  ) {
    let sum: number = 0;
    const limit: number = 8;

    console.log(reports);
    console.log(report);

    reports
      .filter(elem => elem.startDate == report.startDate)
      .forEach(r => (sum += r.time));
    if (idEdited) {
      console.log(reports.filter(elem => elem.id === report.id));
      const oldReportTime: number = reports.filter(
        elem => elem.id === report.id
      )[0].time;
      sum -= oldReportTime;
    }
    sum += report.time;
    return sum <= limit;
  }
}
