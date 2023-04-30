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
    return this.http.get<TestCase[]>('http://127.0.0.1:5000/testcases');
  }

  createTestcase(testcaseName: string) {
    const requestBody = {
      name: testcaseName
    }
    return this.http.post("http://127.0.0.1:5000/testcases", requestBody);
  }

  deleteTestcase(testcaseId: number) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ id: testcaseId }),
    }
    return this.http.delete('http://127.0.0.1:5000/testcases', options);
  }
}


