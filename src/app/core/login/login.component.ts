import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Flight, DefaultInitialFlightsData } from 'src/app/models/flight.model';
import { AuthService } from '../services/auth.service';
import { FlightsService } from '../services/flights.service';

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
    private toasts: MatSnackBar,
    private flightsService: FlightsService
  ) {

  }

  public login() {
    this.authService.login(this.credentials)
      .then((user) => {
        this.router.navigate(['/dashboard']);
        this.flightsService.API_URL = `/users/${user.uid}/flights`;
      })
      .catch((error) => this.toasts.open(error.message))
  }

  public register() {
      this.authService.register(this.credentials)
      .then((credential: any) => { 
        this.toasts.open('Account created, plese log in', '', { panelClass: 'toast--success' });
        DefaultInitialFlightsData.forEach((flight: Flight) => {
          this.authService.db.list<Flight>(`/users/${credential.user.uid}/flights`).push(flight);
        }); 
      })
      .catch((error) => this.toasts.open(error.message, '', { panelClass: 'toast--error' }))
  }
}
