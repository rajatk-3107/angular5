import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from "./login.service";

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private login: LoginService, private router: Router) {}
  canActivate() {
    if (!this.login.isLogin && !localStorage.getItem('token')) {
      alert('Please Login');
      console.log(this.login.isLogin)
      this.router.navigate(['/login']);
      return false;
    } else {
      console.log(!localStorage.getItem('token'))
      console.log(this.login.isLogin)
      return true;
    }
  }
}
