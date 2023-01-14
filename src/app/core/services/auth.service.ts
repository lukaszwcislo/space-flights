import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth
  ) {}

  public login(credentials: {email: string, password: string} ) {
    return this.fireAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
  }
}