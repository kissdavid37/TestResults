import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private router: Router) {


  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    const decodedToken = jwt_decode(token);
    const expDate = new Date(decodedToken['exp'] * 1000)
    if (expDate.getTime() < Date.now()) {
      return this.router.navigate(['login']);
    }
    else {
      this.isLoggedIn.next(true);
      
      return true;
    }
  }
}
