import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  Component } from '@angular/core';
import { TestcasesService } from './testcases.service';
import { OnInit } from '@angular/core';
import { TestCase } from './test-case';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-testcases',
  templateUrl: './testcases.component.html',
  styleUrls: ['./testcases.component.css']
})
export class TestcasesComponent implements OnInit {

  testcases: TestCase[] = [];
  isFetching = false;
  error = false;
  errorMessage = null;
  filteredTestcase = ''

  signupForm: FormGroup;
  constructor(private http: HttpClient, private testcaseService: TestcasesService) {

  }
  ngOnInit() {
    this.onGetTestcases();

    this.signupForm = new FormGroup({
      'testcaseName': new FormControl(null, [Validators.required]),
      'testcaseFilter': new FormControl()
    });
    this.isFetching = true;
  }

  onCreateNewTestCase() {
    this.testcaseService.createTestcase(this.signupForm.get('testcaseName').value).subscribe(response => {
      this.signupForm.reset();
      this.error = false
      console.log('ITT')
      this.onGetTestcases();

    },
      (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.error = !this.error;
          this.errorMessage = error.error

          console.error(error.error)
          this.signupForm.reset();
        }
      })
  }

  onDeleteTestcase(testcaseId: number) {
    console.log('onDeleteTestcase');
    this.testcaseService.deleteTestcase(testcaseId).subscribe(response => {
      this.error = false;
      this.onGetTestcases();
    },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.error = !this.error;
          this.errorMessage = error.error
        }
        if (error.status === 409) {
          this.error = !this.error;
          this.errorMessage = error.error
        }
      })
  }


  onGetTestcases() {
    this.testcaseService.getTestCases().subscribe(tc => {
      this.isFetching = false;
      this.testcases = []
      this.testcases = tc;
      console.log(this.testcases)
    },
      (error: HttpErrorResponse) => {
        this.isFetching = false;
        this.errorMessage = error.message
      });
  }
}
