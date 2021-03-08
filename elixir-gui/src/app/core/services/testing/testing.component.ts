import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder,  Validators } from '@angular/forms';
import {Router} from '@angular/router';
//import Testing from './testing';

@Component({
 selector: 'app-testing',
 templateUrl: './testing.component.html',
 styleUrls: ['./testing.component.css']
})

export class TestingComponent implements OnInit {
  angForm = new FormGroup ({
    title: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    gender: new FormControl('',Validators.required),
    dob: new FormControl(''),
    phone: new FormControl('',[Validators.required,Validators.maxLength(10)]),
    marital_status: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    medical_history: new FormControl()
  });
  public location = '' ;
 // angForm: FormGroup;
 // testing: Testing[];
  objadd:{[k: string]: any} = {};
  dtOptions: DataTables.Settings = {};
  formvalue: {[k: string]: any} = {};
//public formvalue: Object;
private _jsonURL = 'assets/json/patients.json';

dtTrigger: Subject<Testing> = new Subject();

 constructor(private http: HttpClient, private fb: FormBuilder,  public _router : Router) {
   this.getJSON().subscribe(data => {
    console.log(data);
    this.formvalue=data;
   });
   this.location = _router.url;
 //  this.createForm();

 }
 public getJSON(): Observable<any> {
   return this.http.get(this._jsonURL);
 }
 /*createForm() {
  this.angForm = this.fb.group({
   // title: [''],
      name: ['', Validators.required],
      marital_status: ['', Validators.required],
      dob: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      medical_history: [''],
      pwd: [''],
      gender: ['', Validators.required],
      mail: ['']
  });
}*/
 ngOnInit() {
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10
  };
 }
 add() {
 //  alert(JSON.stringify(this.angForm));
 alert(JSON.stringify(this.angForm.value));

  //alert(JSON.stringify(obj));
//  this.service.add(obj);
}
}

export default class Testing {
  title:string;
  name: string;
  qualification: string;
  medical_id: string;
  gender:string;
  phone: number;
  address: string;
  records: string;
  medical_history:string;
  marital_status:string;
  dob: Date;
  id:number;
  age:number;
  mail: string;
}
