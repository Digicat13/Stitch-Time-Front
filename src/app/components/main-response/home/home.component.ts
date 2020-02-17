import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { SignInUpService } from "src/app/services/sign-in-up.service";
import { FetchDefaultInfoService } from "src/app/services/fetch-default-info.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit , OnDestroy {
  projects: string[] = ["EDU-pr", "MED", "cancerheal", "adasdad"];
  position: number;
  constructor(
    private signInUp: SignInUpService,
    private defaultInfoService: FetchDefaultInfoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.position = +JSON.parse(localStorage.getItem("userData")).positionId;
    console.log(this.position);
    this.defaultInfoService.fetchDefaultInfo();
    // this.position = 2;
  }

  ngOnDestroy() {
    this.signInUp.logout();
    this.router.navigate(['/']);
  }
  onLogout() {
    this.signInUp.logout();
  }

}
