import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestRun } from './test-run';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestrunsService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getTestRuns() {
    const token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': token
      })
    }
    return this.http.get<TestRun[]>(`${this.baseUrl}/testruns`, httpOptions);
  }

  updateTestrun(version: number, id: number, success: number) {
    const token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': token
      })
    }
    const requestBody = {
      version: version,
      tcID: id,
      success: success
    }
    return this.http.put(`${this.baseUrl}/testruns`, requestBody, httpOptions)
  }

  addTestrun(version: number, name: string) {
    const token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': token
      })
    }
    const requestBody = {
      version: version,
      name: name
    }
    return this.http.post(`${this.baseUrl}/testruns`, requestBody, httpOptions)
  }
}
