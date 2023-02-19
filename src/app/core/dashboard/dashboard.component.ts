import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('confirmDeletion') confirmDeletion: any;
  public user = this.authService.user;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
   
  }

  public isSetDarkMode!: boolean;
  public isMenuActive = false;

  public logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/login']);
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

  public toggleMenu(menu: HTMLDivElement) {
    menu.classList.toggle('active');
    this.isMenuActive = !this.isMenuActive;
  }

  private keyPressListener() {
    let text = '';
    const passRemove = /dbremove/;
    const passLogout = /dbuserlogout/;
    window.addEventListener('keypress', (e: KeyboardEvent) => {
      text += e.key;;
      if(passRemove.test(text) === true) {
        text = '';
        this.dialog.open(this.confirmDeletion, {
          width: 'unset'
        })
      }
      if(passLogout.test(text) === true) {
        text = '';
        this.authService.logout()
          .then(
            () => this.router.navigate(['/login']),
          )
      }
    })
  }

  public removeAccount() {
    this.authService.removeAccount().then(
      () => this.dialog.closeAll()
    )
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
    this.keyPressListener();
  }
  
}
