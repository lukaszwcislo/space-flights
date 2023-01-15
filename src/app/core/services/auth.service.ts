import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { UserInfo } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth
  ) {}

  private userData!: UserInfo;

  public login(credentials: {email: string, password: string} ) {
    return this.fireAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((userCredential: any) => this.userData = userCredential.user)
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