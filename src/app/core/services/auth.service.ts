import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UserInfo } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Flight } from "src/app/models/flight.model";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private API_URL = `/users`;

  constructor(
    public fireAuth: AngularFireAuth,
    private router: Router,
    public db: AngularFireDatabase,
    private toasts: MatSnackBar
  ) {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('loggedUser', JSON.stringify(user));
        this.userData = user;
        this.updateUserData$.next(user)
      } else {
        localStorage.setItem('loggedUser', '');
      }
    });
  }

  public userData!: UserInfo;
  public updateUserData$ : Subject<any> = new Subject();

  public async login(credentials: {email: string, password: string} ) {
    return this.fireAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((userCredential: any) => {
        return this.userData = userCredential.user
      })
  }

  public register(credentials: {email: string, password: string} ) {
    return this.fireAuth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  public removeAccount() {
    this.db.object<any>(`/users/${JSON.parse(localStorage["loggedUser"]).uid}`).remove();
    return this.fireAuth.currentUser.then(user => user?.delete())
      .then((user: any) => { 
        this.toasts.open('Your account has been successfully removed', '', { panelClass: 'toast--success' });
        this.router.navigate(['/']);
      })
      .catch((error) => this.toasts.open(error.message))
  }

  get user() {
    return this.userData; 
  }

  public logout() {
    return this.fireAuth.signOut()
  }

  public isLoggedIn() {
    return !!this.userData;
  }
}