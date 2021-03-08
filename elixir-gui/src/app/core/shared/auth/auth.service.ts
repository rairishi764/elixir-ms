import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model'; // optional
import * as firebase from 'firebase';
//import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PatientsService } from '../../services/patients/patients.service';
import Patients from '../../services/patients/patients';
import { PatientsComponent } from 'src/app/core/services/patients/patients.component';
import Consultants from '../../services/consultants/consultants';
import Employees from '../../services/employee/employee';
import { EmployeeService } from '../../services/employee/employee.service';
import { ConsultantsService } from '../../services/consultants/consultants.service';
@Injectable({ providedIn: 'root' })
export class AuthService {

    user: User;
    newPatient:{ [k: string]: any } = {};
    patients: Patients[];
    consultants: Consultants[];
    employees: Employees[];

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        public router: Router,
        public ngZone: NgZone,
        private angularFireAuth: AngularFireAuth,
        public patientService: PatientsService,
        public employeeService: EmployeeService,
        public consultantService : ConsultantsService

    ) {
      this.afAuth.authState.subscribe(user => {
        this.user = user;
    })
    }

    async googleSignin() {
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      return this.updateUserData(credential.user);
    }

    private updateUserData(user) {
      // Sets user data to firestore on login
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
      var userWithRole = this.loginDbSync(user)

      const data = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        providerId: user.providerId,
        role: userWithRole.role
      }

      return userRef.set(data, { merge: true })

    }

    async signOut() {
      await this.afAuth.signOut();
      this.router.navigate(['/']);
    }


    loginDbSync(user){
      var notfound = true;

      this.employeeService.listAll().subscribe((data: Employees[]) => {
        this.employees = data;
        for(let obj of this.employees){
          //alert("Employee Check:"+obj.mail+" "+user.email)
          if(obj.mail==user.email){
            user.role=obj.access_type;
            notfound = false
          }
        }
        });

      if(notfound){
        this.consultantService.listAll().subscribe((data: Consultants[]) => {
        this.consultants = data;
        for(let obj of this.consultants){
          //alert("Consultant Check:"+obj.mail+" "+user.email)
          if(obj.mail==user.email){
            user.role=obj.access_type;
            notfound=false;
          }
        }
      });
      }
      //alert("XXX:"+notfound)
      if(notfound){
        //alert("Adding patient")
      this.patientService.listAll().subscribe((data: Patients[]) => {
      this.patients = data;
      for (let obj of this.patients){
        if(user.email==obj.mail){
          user.role=4;
          notfound = false
        }
      }
        if(notfound){
          this.newPatient['name'] = user.displayName;
          this.newPatient['mail'] = user.email;
          this.newPatient['access_type'] = 4;
          user.role = 4;
          this.patientService.add(this.newPatient)
        }
     });
    }

     return user
    }

}
