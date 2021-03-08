import { Injectable, NgZone } from '@angular/core';
import { User } from "../../core/shared/auth/user.model";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    public user: User;

    constructor(
        public router: Router,
        public ngZone: NgZone,
        public afAuth: AngularFireAuth,
        private angularFireAuth: AngularFireAuth
    ) {
        this.afAuth.authState.subscribe(user => {
            this.user = user;
        })
    }

    // Firebase SignInWithPopup
    OAuthProvider(provider) {
        return this.afAuth.signInWithPopup(provider)
            .then((res) => {
                this.ngZone.run(() => {
                  alert("Hello");
                    this.router.navigate(['consultationinvoice/add']);
                })
            }).catch((error) => {
                window.alert(error)
            })
    }

    // Firebase Google Sign-in
    SigninWithGoogle() {
        return this.OAuthProvider(new firebase.auth.GoogleAuthProvider())
            .then(res => {
                alert("Hello");
                console.log('Successfully logged in!')
                this.router.navigate(['consultationinvoice/add']);
            }).catch(error => {
                alert("ERROR");
                console.log(error)
            });
    }

    // Firebase Logout
    SignOut() {
        return this.afAuth.signOut().then(() => {
            this.router.navigate(['login']);
        })
    }

}
