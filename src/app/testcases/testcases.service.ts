import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TestCase } from './test-case';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestcasesService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }


  getTestCases() {
    const token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': token
      })
    }
    return this.http.get<TestCase[]>(`${this.baseUrl}/testcases`, httpOptions);
  }

  createTestcase(testcaseName: string) {
    const requestBody = {
      name: testcaseName
    }
    const token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': token
      })
    }
    return this.http.post(`${this.baseUrl}/testcases`, requestBody, httpOptions);
  }

  deleteTestcase(testcaseId: number) {
    const token = localStorage.getItem('token')
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      }),
      body: JSON.stringify({ id: testcaseId }),
    }
    return this.http.delete(`${this.baseUrl}/testcases`, options);
  }
}


