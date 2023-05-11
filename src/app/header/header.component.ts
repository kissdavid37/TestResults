import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() isLoggedIn: boolean
  isCollapsed=false;
  collapsed:string='collapse'
  
  constructor(private authService:AuthService) {

  }
  onLogout() {
    this.authService.logout();
  }

  autoLogout(expDate:number){
    setTimeout(() => {
      console.log('Logged out!')
      this.onLogout();
    }, expDate);
  }

  onToggle(){
    if(this.collapsed==='collapse'){
      this.collapsed='open';
    }
    else{
      this.collapsed='collapse'
    }
  }
}
