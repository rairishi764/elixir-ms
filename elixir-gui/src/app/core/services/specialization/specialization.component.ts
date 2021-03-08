import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import Specialization from './specialization'
import { SpecializationService } from './specialization.service'
@Component({
  selector: 'app-specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.css']
})
export class SpecializationComponent implements OnInit {

//copy as is
public location = '' ;
angForm: FormGroup;
objedit: {[k: string]: any} = {};
objadd:{[k: string]: any} = {};
dtOptions: DataTables.Settings = {};
//copy as above
dtTrigger: Subject<Specialization> = new Subject();
objlist: Specialization[];

constructor(private fb: FormBuilder, private service: SpecializationService, public _router : Router) {
  this.location = _router.url;
  this.createForm();
}

ngOnInit() {
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10
  };

    this.service.listAll().subscribe((data: Specialization[]) => {
    this.objlist = data;
    this.dtTrigger.next();
});
}

createForm() {
  this.angForm = this.fb.group({
    name: ['', Validators.required ]
  });
}

//copy as is
add(obj) {
  this.service.add(obj);

}

updateview(obj){
  this.objedit=obj;
}

update(obj){
  this.service.update(obj);

}

remove(id){
  if (confirm("Are you sure you want to delete") == true) {
  this.service.remove(id)
  this.dtTrigger.unsubscribe();
  this.ngOnInit();
  }
}
//copy all above
}
