import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public dataService: DataService,
    public fireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
    ) {
      this.fireAuth.authState.subscribe((user) => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user))
        }
        else {
          localStorage.setItem('user', null);
        }
      })
  }

  SignUp(email, password){
    console.log("attempting to sign up now")
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.SendVerificationEmail();
        window.alert("Please check your email to validate!!!")
        this.dataService.addUserToCollection(res);
        this.router.navigate(['log']);
      })
      .catch((err) => {
        window.alert(err.message);
      })
  }

  SignIn(email, password){
    console.log('attempting to log in')
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
    .then((res) => {
      console.log("a")
      this.router.navigate(['home']);
      console.log("z")
    })
  }

  SendVerificationEmail(){
    return this.fireAuth.auth.currentUser.sendEmailVerification()
  }

  isAdmin(){
    const uid = this.fireAuth.auth.currentUser.uid;
    return this.dataService.isAdminApproved(uid);
  }

}
