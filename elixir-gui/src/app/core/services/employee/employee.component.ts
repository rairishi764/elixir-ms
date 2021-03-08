import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { EmployeeService } from './employee.service';
import Employee from './employee';
import {Router} from '@angular/router';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public location = '' ;
  angForm: FormGroup;
  employees: Employee[];
  objedit: {[k: string]: any} = {};
  objadd:{[k: string]: any} = {};
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<Employee> = new Subject();

  constructor(private fb: FormBuilder, private service: EmployeeService, public _router : Router)
  {
    this.location = _router.url;
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      qualification: ['', Validators.required ],
      phone: [0, Validators.required ],
      reference:[''],
      address: [''],
      records: [''],
      dob: ['', Validators.required ],
      employee_type:[''],
      marital_status:[''],
      access_type:[''],
      mail:['', ],
      pwd:['', ]
    });
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.service.listAll().subscribe((data: Employee[]) => {
        this.employees = data;
        this.dtTrigger.next();
    });
  }

  add(obj) {
    alert(JSON.stringify(obj));
    this.service.add(obj);
  }

  updateview(obj){
    this.objedit=obj;
  }

  update(obj){
    this.service.update(obj);
    this.ngOnInit();

  }

  remove(id){
    if (confirm("Are you sure you want to delete") == true) {
    this.service.remove(id);
    this.dtTrigger.unsubscribe();
    this.ngOnInit()
    }
  }

}
