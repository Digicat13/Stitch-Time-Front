import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IUserData, IFullUserData } from "../interfaces/user-data";
import { environment } from "../../environments/environment";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { User } from "../interfaces/user-class.model";
import { Router } from "@angular/router";

@Injectable()
export class SignInUpService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}

  signUp(userSignUpData: IUserData) {
    return this.http
      .post<IUserData>(environment.apiUrl + "/Account/SignUp", userSignUpData)
      .pipe(
        catchError(this.errorHandling),
        tap(responseData => {
          this.authHandling(
            responseData.email,
            responseData.firstName,
            responseData.secondName,
            responseData.id,
            responseData.positionId
          );
        })
      );
  }

  singIn(userLoginInData: IUserData) {
    console.log(userLoginInData);
    return this.http
      .post<IUserData>(environment.apiUrl + "/Account/SignIn", userLoginInData)
      .pipe(
        catchError(this.errorHandling),
        tap(responseData => {
          this.authHandling(
            responseData.email,
            responseData.firstName,
            responseData.secondName,
            responseData.id,
            responseData.positionId
          );
        })
      );
  }

  getUserInfoById() {
    console.log("we r here!!!");
    return this.http.get<IFullUserData>(
      environment.apiUrl +
        "/user/GetInfo/" +
        JSON.parse(localStorage.getItem("userData")).id
    );
  }

  autoLogin() {
    const userData: User = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.firstName,
      userData.secondName,
      userData.id,
      userData.positionId
    );

    this.user.next(loadedUser);
    this.autoLogout();
  }

  logout() {
    this.user.next(null);
    console.log(JSON.parse(localStorage.getItem("userData")).id);

    this.http
      .get(
        environment.apiUrl +
          "/Account/Logout/" +
          JSON.parse(localStorage.getItem("userData")).id
      )
      .subscribe(responseData => {});
    this.router.navigate(["/login"]);
    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  autoLogout() {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, 3600000);
  }

  private authHandling(
    email: string,
    name: string,
    surname: string,
    Id: string,
    possitionId: number
  ) {
    const user = new User(email, name, surname, Id, possitionId);
    this.user.next(user);
    this.autoLogout();
    localStorage.setItem("userData", JSON.stringify(user));
  }

  private errorHandling(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);

    switch (errorResponse.error) {
      case "Bad password": {
        return throwError(errorResponse.error);
      }
      case "Email is in use.": {
        return throwError(errorResponse.error);
      }
      case "There is no email": {
        return throwError(errorResponse.error);
      }
    }

    return throwError({
      name: errorResponse.name,
      message: errorResponse.message
    });
  }
}
