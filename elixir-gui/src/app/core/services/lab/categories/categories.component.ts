//copy as is
import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
//copy all above
import { CategoriesService } from './categories.service'
import Categories from './categories'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  //copy as is
  public location = '' ;
  angForm: FormGroup;
  objedit: {[k: string]: any} = {};
  objadd:{[k: string]: any} = {};
  dtOptions: DataTables.Settings = {};
  //copy as above

  dtTrigger: Subject<Categories> = new Subject();
  objlist: Categories[];

  constructor(private fb: FormBuilder, private service: CategoriesService, public _router : Router) {
    this.location = _router.url;
    this.createForm();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

      this.service.listAll().subscribe((data: Categories[]) => {
      this.objlist = data;
      this.dtTrigger.next();
  });
  }

  createForm() {
    this.angForm = this.fb.group({
      lab_category_name: ['', Validators.required ]
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
