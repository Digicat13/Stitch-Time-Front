import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IUserData } from "../interfaces/user-data";
import { environment} from '../../environments/environment';

@Injectable()
export class SignInUpService {
  constructor(private http: HttpClient) {}

  signUp(userData: IUserData) {

    // for (let i = 0; i < 50000; ++i) {}
    // return userData;
    // return this.http.post<IUserData>(environment.apiUrl + '' , userData);

    return this.http.post<IUserData>(environment.apiUrl + '/events/headers', userData);
  }
}
