import { Component, OnInit, AfterViewInit } from "@angular/core";
import { SignInUpService } from "src/app/services/sign-in-up.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "StitchTime";

  constructor(
    private signInUpService: SignInUpService  ) {}

  ngOnInit() {
    this.signInUpService.autoLogin();

  }
}
