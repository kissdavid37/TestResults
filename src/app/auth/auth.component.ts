import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthGuard } from './auth.guard';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  signupForm: FormGroup
  isLoginMode: boolean = true;
  error: Boolean = false;
  errorMessage: string = null;
  isLoading: boolean = false;
  expTime:number;

  constructor(private authService: AuthService, private router: Router,private authGuard:AuthGuard) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl(null)
    })
  }

  onSubmit(username: string, password: string, confirmPassword: string) {
    let authObs: Observable<any>;

    if (this.isLoginMode) {
      this.isLoading = true;
      authObs = this.authService.login(username, password);
    }
    else {
      authObs = this.authService.register(username, password, confirmPassword);
    }
    authObs.subscribe({
      next: (resData) => {
        console.log(resData);
        if (this.isLoginMode) {
          localStorage.setItem('token', resData['token']);

          this.authGuard.isLoggedIn.next(true)
          this.router.navigate(['/testruns']);
          this.removeRequiredValidator('confirmPassword');
        }
        else {
          this.isLoginMode = true
        }
        this.signupForm.reset();
      },
      error: (e: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(e);
        this.error = true;
        this.signupForm.reset();
        this.errorMessage = e.error
      }
    })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.signupForm.reset();
    if (this.isLoginMode) {
      this.removeRequiredValidator('confirmPassword');
    }
    else {
      this.setRequiredValidators('confirmPassword')
    }
  }

  setRequiredValidators(controlName: string) {
    const formControl = this.signupForm.get(controlName);
    const validators = Validators.required;
    formControl.setValidators(validators)
    formControl.updateValueAndValidity();
  }

  removeRequiredValidator(controlName: string) {
    const formControl = this.signupForm.get(controlName);
    formControl.clearValidators();
    formControl.updateValueAndValidity();
  }
}
