import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

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



  constructor(private authService: AuthService, private router: Router) {


  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit(username: string, password: string) {
    let authObs: Observable<any>;

    if (this.isLoginMode) {
      this.isLoading = true;
      authObs = this.authService.login(username, password);
    }
    else {
      authObs = this.authService.register(username, password);
    }
    authObs.subscribe({
      next: (resData) => {
        console.log(resData);
        if (this.isLoginMode) {
          localStorage.setItem('token', resData['token']);
          this.authService.isLoggedIn.next(true)
          this.router.navigate(['/testruns']);
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
  }
}
