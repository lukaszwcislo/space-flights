import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { UserInfo } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    public fireAuth: AngularFireAuth,
    private router: Router
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
    return this.fireAuth.createUserWithEmailAndPassword(credentials.email, credentials.password)
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