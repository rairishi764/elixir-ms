//copy as is
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
//copy all above
import { SubCategoriesService } from './subcategories.service'
import SubCategories from './subcategories'
import { HttpClient } from '@angular/common/http';
import Categories from '../categories/categories';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubCategoriesComponent implements OnInit {
  //copy as is
  public location = '';
  angForm: FormGroup;
  objedit: { [k: string]: any } = {};
  objadd: { [k: string]: any } = {};
  dtOptions: DataTables.Settings = {};
  private http: HttpClient;
  //copy as above
  categorieslist: Categories[] = [];
  dtTrigger: Subject<SubCategories> = new Subject();
  objlist: SubCategories[];

  constructor(private fb: FormBuilder, private service: SubCategoriesService, public _router: Router) {
    this.location = _router.url;
    this.createForm();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.service.listAll().subscribe((data: SubCategories[]) => {
      this.objlist = data;
      this.service.listCategories().subscribe((data: Categories[]) => {
        this.categorieslist = data;
        for (let item of this.objlist) {
          for (let category of this.categorieslist) {
            if (category.lab_category_id == item.lab_category_id) {
              item.lab_category_id = category.lab_category_id;
              item.lab_category_name = category.lab_category_name;
            }
          }
        }

      }
      );
      this.dtTrigger.next();
    });
  }

  createForm() {
    this.angForm = this.fb.group({
      lab_category_id: ['', Validators.required],
      lab_sub_category_name: ['', Validators.required]
    });
  }
  //copy as is
  add(obj) {
    this.service.add(obj);
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
    }
  }
  //copy all above
}

