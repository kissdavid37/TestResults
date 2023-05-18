import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TestrunsService } from './testruns.service';
import {HttpErrorResponse } from '@angular/common/http';
import { TestRun } from './test-run';
import { TestcasesService } from '../testcases/testcases.service';
import { TestCase } from '../testcases/test-case';

@Component({
  selector: 'app-testruns',
  templateUrl: './testruns.component.html',
  styleUrls: ['./testruns.component.css']
})
export class TestrunsComponent implements OnInit {
  testRuns: TestRun[] = [];
  isFetching = false;
  error = false;
  errorMessage = null;
  versions = [];
  filteredVersion: any;
  testcases: TestCase[] = [];
  signupForm: FormGroup;
  @ViewChild('versionRef') versionRef: ElementRef;

  constructor(private testrunService: TestrunsService, private testcaseService: TestcasesService) {
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'versionDropdown': new FormControl(null, Validators.required),
      'testcaseName': new FormControl(null, [Validators.required]),
    })
    this.onGetTestcases();
    this.onGetTestRuns();
  }

  onAddTestRun(version: number, name: string) {
    this.testrunService.addTestrun(version, name).subscribe({
      next: () => {
        this.onGetTestRuns();
        this.versionRef.nativeElement.value = ''
      },
      error: (e: HttpErrorResponse) => {
        this.error = !this.error
        this.errorMessage = e.error;
        console.log(e);
      }
    });
  }

  onGetTestRuns() {
    this.testrunService.getTestRuns().subscribe({
      next: (tr) => {
        this.isFetching = false;
        this.testRuns = tr;
        this.distinctVersions()
      },
      error: (e: HttpErrorResponse) => {
        this.errorMessage = e.message;
        this.error = true
        console.log(e);
      }
    });
  }

  distinctVersions() {
    for (const v of this.testRuns) {
      if (!this.versions.includes(v.version)) {
        this.versions.push(v.version);
      }
      this.versions = this.versions.slice().reverse()
    }
  }

  getSuccessState(result: { version: number, tescase: string, sucess: number }) {
    return {
      'list-success': result.sucess === 1,
      'list-fail': result.sucess === -1,
      'list-notrun': result.sucess === 0,
    }
  }

  onUpdateTestResult(version: number, id: number, success: number) {
    this.testrunService.updateTestrun(version, id, success).subscribe(
      {
        next: () => {
          this.onGetTestRuns();
        },
        error: (e: HttpErrorResponse) => {
          this.errorMessage = e.error;
          this.error = true
          console.log(e);
        }
      }
    )
  }

  onGetTestcases() {
    this.testcaseService.getTestCases().subscribe(tc => {
      this.testcases = tc;
    },
      (error: HttpErrorResponse) => {
        this.isFetching = false;
        this.errorMessage = error.message
      });
  }

}
