import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: "app-error-response-dialog",
  templateUrl: "./error-response-dialog.component.html",
  styleUrls: ["./error-response-dialog.component.scss"]
})
export class ErrorResponseDialogComponent implements OnInit {
  errorMessage: string;
  constructor(
    public dialogRef: MatDialogRef<ErrorResponseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public errorName: string,
    private localStorageService: LocalStorageService) {}

  ngOnInit() {
        this.errorMessage = this.errorName;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
