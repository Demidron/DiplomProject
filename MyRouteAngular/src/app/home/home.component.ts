import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  isLogin:boolean=false;

  constructor(private router: Router) { }
  
  
  ngOnInit() {
    this.isLogin=localStorage.getItem('refreshToken')!=null;
  }

  onLogout() {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    this.isLogin=false;
   // this.router.navigate(['/user/login']);
  }
  onSignIn(){
    this.router.navigate(['/user/login']);
  }


}
