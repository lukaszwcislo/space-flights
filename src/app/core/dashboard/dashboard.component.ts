import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public user = this.authService.user;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
   
  }

  public isSetDarkMode!: boolean;

  public logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/login'])
      })
  }

  public changeAppTheme() {
    const body = document.body;

    if(localStorage.hasOwnProperty('darkMode')) {
      if(JSON.parse(localStorage["darkMode"]) === true) {
        body.removeAttribute('data-dark-mode');
        localStorage.setItem('darkMode', 'false')
        this.isSetDarkMode = false;
      } else {
        body.setAttribute('data-dark-mode', '')
        localStorage.setItem('darkMode', 'true');
        this.isSetDarkMode = true;
      }
    } else {
      body.setAttribute('data-dark-mode', '');
      localStorage.setItem('darkMode', 'true');
      this.isSetDarkMode = true;
    }
  }

  ngOnInit(): void {
    if(localStorage.hasOwnProperty('darkMode')) {
      if(JSON.parse(localStorage["darkMode"]) === true) {
        this.isSetDarkMode = true;
      } else {
        this.isSetDarkMode = false;
      }
    } else {
      this.isSetDarkMode = false;
    }
    this.authService.updateUserData$
      .subscribe(userData => {
        this.user = userData;
      })
  }
  
}
