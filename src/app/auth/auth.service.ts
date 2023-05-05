import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const requestBody = {
      username: username,
      password: password
    }

    return this.http.post('http://127.0.0.1:5000/login', requestBody)
  }
}
