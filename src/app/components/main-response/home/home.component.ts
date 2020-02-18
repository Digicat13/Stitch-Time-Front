import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { SignInUpService } from "src/app/services/sign-in-up.service";
import { IPosition } from 'src/app/interfaces/report-data';
import { Router } from '@angular/router';
import { FetchDefaultInfoService } from "src/app/services/fetch-default-info.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit  {
  projects: string[] = ["EDU-pr", "MED", "cancerheal", "adasdad"];

  positionId: number;
  positions: Array<IPosition> = [ ];



  constructor(
    private signInUp: SignInUpService,
    private defaultInfoService: FetchDefaultInfoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.positionId = +JSON.parse(localStorage.getItem("userData")).positionId;
    console.log(this.positionId);
    this.defaultInfoService.fetchDefaultInfo();
    this.positions = JSON.parse(localStorage.getItem('possitionsData'));
    // this.position = 2;
  }


  onLogout() {
    this.signInUp.logout();
  }

  getPositionById(id: number){
    return this.positions.find(position => position.id == this.positionId).name;
    }
}
