import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IUserData } from "../interfaces/user-data";
import { environment } from "../../environments/environment";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { User } from "../interfaces/user-class.model";

@Injectable()
export class SignInUpService {
  user = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient) {}

  signUp(userSignUpData: IUserData) {
    return this.http
      .post<IUserData>(environment.apiUrl + "/registration", userSignUpData)
      .pipe(
        catchError(this.errorHandling),
        tap(responseData => {
          this.authHandling(
            responseData.email,
            responseData.name,
            responseData.surname
          );
        })
      );
  }

  singIn(userLoginInData: IUserData) {
    return this.http
      .post<IUserData>(environment.apiUrl + "/login", userLoginInData)
      .pipe(
        catchError(this.errorHandling),
        tap(responseData => {
          this.authHandling(
            responseData.email,
            responseData.name,
            responseData.surname
          );
        })
      );
  }

  private authHandling(email: string, name: string, surname: string) {
    const user = new User(email, name, surname);
    this.user.next(user);
  }

  private errorHandling(errorResponse: HttpErrorResponse) {
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
