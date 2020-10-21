import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import * as firebase from 'firebase';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
public isLogged: any = false;
  constructor(public router: Router) {
  }
  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  signup(email: string, password: string, nombre: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
      firebase.auth().currentUser.updateProfile({
        displayName: nombre
      })
    });
  }

  signout() {
    firebase.auth().signOut().then(res => { console.log(res) })
      .catch(e => { console.log(e) });
  }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          resolve(true);
        } else {
          // No user is signed in.
          resolve(false);
          this.router.navigate(['/login']);
        }
      });
    });
  }
}


