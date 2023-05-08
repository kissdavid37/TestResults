import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = environment.baseUrl;
  isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

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
}
