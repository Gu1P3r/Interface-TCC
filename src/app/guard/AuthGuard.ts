import { AuthService } from './../login/service/auth.service';
import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";

const TOKEN_KEY = 'AuthToken';


@Injectable()
export class AuthGuard implements CanActivate {


  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | boolean {

    if (window.sessionStorage.getItem(TOKEN_KEY) != null) {
      return true;
    } else {

      this.router.navigate(['/login']);

      return false;
    }
  }
}