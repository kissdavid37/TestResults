import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = environment.baseUrl;
  tokenExpirationTimer:any;
  constructor(private http: HttpClient,private authGuard:AuthGuard, private router:Router) { }

  login(username: string, password: string) {
    const requestBody = {
      username: username,
      password: password
    }

    return this.http.post(`${this.baseUrl}/login`, requestBody)
  }

  register(username: string, password: string, confirmPassword: string) {
    const requestBody = {
      username: username,
      password: password,
      confirm: confirmPassword
    }

    return this.http.post(`${this.baseUrl}/register`, requestBody)
  }

  logout() {
    localStorage.clear();
    this.authGuard.isLoggedIn.next(false);
    this.router.navigate(['login']);
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
  }
}


