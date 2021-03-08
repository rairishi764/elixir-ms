import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { RouterModule, Routes, Router} from '@angular/router';
import { Session } from 'protractor';
import { AuthenticationService } from './authentication.service';
import User from './user'

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent{
 angForm: FormGroup;
 user1:User;
 user:{[k: string]: any} = {};
  constructor(private fb: FormBuilder, private router: Router,private service:AuthenticationService){
    this.createForm();
}

createForm() {
  this.angForm = this.fb.group({
    mail: ['', Validators.required ],
    pwd: ['', Validators.required ],
    access_type: ['', Validators.required ]
  });
}
  ngOnInit(): void {
  }


  submit(obj){
    this.service.authenticate(obj).subscribe((data: User) => {
      this.user1 = data;
      //alert(JSON.stringify(data))
      });
     //Uncomment for db authentication
    if((this.user1.mail!=null&&this.user1.id!=null)&&(this.user1.mail!=undefined)){
      //alert('logged in')
      sessionStorage.setItem("user",this.user1.mail);
      window.location.href=("../index");
    }

  /*  if(obj.mail=="asd" && obj.pwd=="asd"){
  //   window.open("https://www.google.com");
   //   this.router.navigate(['../index.html',session]);
      sessionStorage.setItem("user",obj.mail);
      window.location.href=("../index");
    }*/
    else{
    alert("Username or password is incorrect");
    //this.router.navigate(["../index"]);
    //window.open("https://www.google.com");
    //this.location.replaceState('/'); // clears browser history so they can't navigate with back button
    //sessionStorage.setItem("user","");
    //window.location.href=("../index"); // tells them they've been logged out (somehow)
    }

  }

}
