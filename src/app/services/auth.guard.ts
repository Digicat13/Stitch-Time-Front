import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SignInUpService } from "./sign-in-up.service";
import { map, tap, take } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private signInUpService: SignInUpService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.signInUpService.user.pipe(
      take(1),
      map(user => {
        return !!user;
      }),
      tap(isAuth => {
        if (!isAuth) {
          this.router.navigate(["/login"]);
        }
      })
    );
  }
}
