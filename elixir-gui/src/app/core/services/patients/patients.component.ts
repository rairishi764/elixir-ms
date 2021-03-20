//copy as is
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
//copy all above
import { HttpClient } from '@angular/common/http';
import Patients from "./patients";
import { PatientsService } from './patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: 'patients.component.html'
})
export class PatientsComponent implements OnInit {
    //copy as is
    public location = '';
    angForm: FormGroup;
    objedit: { [k: string]: any } = {};
    objadd: { [k: string]: any } = {};
    dtOptions: DataTables.Settings = {};
    private http: HttpClient;
    //copy as above

    public patients: Patients[] = [];

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
    dtTrigger: Subject<Patients> = new Subject();

  constructor( private fb: FormBuilder, private service: PatientsService, public _router: Router) {
    this.location = _router.url;
    this.createForm();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.service.listAll().subscribe((data: Patients[]) => {
      this.patients = data;
      let index=0;
      for(let item of this.patients){
        let date = new  Date (item.dob)
        this.patients[index].age=this.calculateage(date);
        index++;
      }
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
  });
  }

  createForm() {
    this.angForm = this.fb.group({
      title: [''],
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
  }

  //copy as is
  add(obj) {
    var add = true
    for(let obj1 of this.patients){
        if(obj1.dob!=null){
        if(obj1.dob.toString().substring(0,10)==obj.dob && obj1.gender==obj.gender&&(obj1.phone==obj.phone||obj1.mail==obj.mail)){
          if (confirm("The Patient seems to exist with name:"+obj1.name+", Contact No:"+obj1.phone+". Do u still want to add the user?") == true) {
            add= false
          }
        }
        }
    }
    if (add){
    this.service.add(obj);
  }
  }

  updateview(obj) {
    this.objedit = obj;
  }

  update(obj) {

    this.service.update(obj);
  }

  remove(id) {
    if (confirm("Are you sure you want to delete") == true) {
      this.service.remove(id)
      this.dtTrigger.unsubscribe();
      this.ngOnInit()

    }
  }
  //copy all above
  calculateage(dob){
    console.log("XXX"+dob)
    let timeDiff = Math.abs(Date.now() - dob);
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    console.log("AGE:"+age)
    return age;
  }
}
