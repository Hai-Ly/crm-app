import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

import { take, tap } from 'rxjs/operators';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild  {

  constructor( private router: Router, private authService: AuthService) {

  }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): Observable<boolean> {

    return this.authService.isAuthenticated.pipe(
      take(1),
      tap( isAuth => {
        if (!isAuth) {
          this.router.navigate(['/auth', 'signin'], { queryParams: { redirectUrl: url }});
        }
      }
    ));
  }
}
