import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
projects: string[] = ["EDU-pr", "MED", "cancerheal", "adasdad"];

  constructor() { }

  ngOnInit() {
  }

}
