import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestRun } from './test-run';

@Injectable({
  providedIn: 'root'
})
export class TestrunsService {

  constructor(private http: HttpClient) { }

  getTestRuns() {
    return this.http.get<TestRun[]>('http://127.0.0.1:5000/testruns');
  }

  updateTestrun(version: number, id: number, success: number) {
    const requestBody = {
      version: version,
      tcID: id,
      success: success
    }
    return this.http.put('http://127.0.0.1:5000/testruns', requestBody)
  }

  addTestrun(version: number, name: string) {
    const requestBody = {
      version: version,
      name: name
    }
    return this.http.post('http://127.0.0.1:5000/testruns', requestBody)
  }
}
