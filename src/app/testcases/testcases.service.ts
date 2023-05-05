import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TestCase } from './test-case';

@Injectable({
  providedIn: 'root'
})
export class TestcasesService {

  constructor(private http: HttpClient) { }


  getTestCases() {
    const token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': token
      })
    }
    return this.http.get<TestCase[]>('http://127.0.0.1:5000/testcases', httpOptions);
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
    return this.http.post("http://127.0.0.1:5000/testcases", requestBody, httpOptions);
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
    return this.http.delete('http://127.0.0.1:5000/testcases', options);
  }
}


