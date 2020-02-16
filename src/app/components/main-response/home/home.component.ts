import { Component, OnInit } from "@angular/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { SignInUpService } from "src/app/services/sign-in-up.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  projects: string[] = ["EDU-pr", "MED", "cancerheal", "adasdad"];

  constructor(private signInUp: SignInUpService) {}

  ngOnInit() {}
  onLogout() {
    this.signInUp.logout();
  }
}
