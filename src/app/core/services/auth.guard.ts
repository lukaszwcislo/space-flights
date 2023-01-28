import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: MatSnackBar
  ) {
    this.checkIfUserLogged()
  }

  public checkIfUserLogged(): boolean {
    if (localStorage.hasOwnProperty('loggedUser')) {
      if( localStorage["loggedUser"]) {
        const uid = JSON.parse(localStorage["loggedUser"]).uid;
        if (uid) {
          return true
        }
      }
    }

    return false
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.authService.isLoggedIn() || this.checkIfUserLogged()) {
        return true;
      }

      this.router.navigate(['/login']);
      this.toast.open('You are not authorized to see this page. Please log in');

      return false
  }
  
}
