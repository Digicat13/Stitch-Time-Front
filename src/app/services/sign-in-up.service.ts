import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IUserData } from "../interfaces/user-data";
import { environment } from "../../environments/environment";

@Injectable()
export class SignInUpService {
  constructor(private http: HttpClient) {}

  signUp(userSignUpData: IUserData) {
    return this.http.post<IUserData>(
      environment.apiUrl + "/registration",
      userSignUpData
    );
  }

  singIn(userLoginInData: IUserData) {
    return this.http.post<IUserData>(
      environment.apiUrl + "/login",
      userLoginInData
    );
  }
}
