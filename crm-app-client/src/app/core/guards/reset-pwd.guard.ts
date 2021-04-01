import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class ResetPwdGuard implements CanActivate  {

  constructor( private router: Router, private authService: AuthService) {

  }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.authService.forgotAccount === undefined) {
      this.router.navigate(['/auth', 'forgotpwd']);
      return false;
    }

    return true;
  }
}
