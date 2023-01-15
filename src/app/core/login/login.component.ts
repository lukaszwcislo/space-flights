import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public credentials = {
    email: '',
    password: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private toasts: MatSnackBar
  ) {

  }

  public login() {
    this.authService.login(this.credentials)
      .then((user) => this.router.navigate(['/dashboard']))
      .catch((error) => this.toasts.open(error.message))
  }

  public register() {
      this.authService.register(this.credentials)
      .then((user) => this.toasts.open('Account created, plese log in', '', {panelClass: 'toast--success'}))
      .catch((error) => this.toasts.open(error.message, '', {panelClass: 'toast--error'}))
  }

}
