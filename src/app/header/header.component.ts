import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn: boolean

  constructor(private router: Router, private authService: AuthService) {

  }
  ngOnInit(): void {

  }

  onLogout() {
    localStorage.removeItem('token');
    this.authService.isLoggedIn.next(false)
    this.router.navigate(['login'])
  }
}
