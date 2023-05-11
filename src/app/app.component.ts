import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;

  constructor(private authGuard: AuthGuard) {
     this.authGuard.isLoggedIn.subscribe(value => {
       this.isLoggedIn = value;
     })
  }
}

