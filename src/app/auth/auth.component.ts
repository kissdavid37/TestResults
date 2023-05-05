import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

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

  onLogin(username: string, password: string) {
    this.authService.login(username, password).subscribe({
      next: (resData) => {
        console.log(resData);
        localStorage.setItem('token', resData['token']);
        localStorage.setItem('exp', resData['exp'])
        localStorage.setItem('admin', resData['admin'])
        this.router.navigate(['/testruns']);
        this.signupForm.reset();
      }
    })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
