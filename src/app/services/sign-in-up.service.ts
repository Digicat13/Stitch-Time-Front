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

  getUserInfoById(id: number) {
    return this.http.get<IFullUserData>(environment.apiUrl + "/user/" + id);
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
    if (
      errorResponse.name !== undefined &&
      errorResponse.name === "HttpErrorResponse"
    ) {
      return throwError({
        name: errorResponse.name,
        message: errorResponse.message
      });
    }
    return throwError(errorResponse.message);
  }
}
