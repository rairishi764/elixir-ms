//copy as is
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
//copy all above
import { TestsService } from './tests.service'
import Tests from './tests'
import Partners from '../partners/partners';
import Categories from '../categories/categories';
import SubCategories from '../subcategories/subcategories';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  //copy as is
  public location = '';
  angForm: FormGroup;
  objedit: { [k: string]: any } = {};
  objadd: { [k: string]: any } = {};
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<Tests> = new Subject();
  objlist: Tests[];
  categories: Categories[];
  subcategories: SubCategories[];
  partners: Partners[];

  constructor(private fb: FormBuilder, private service: TestsService, public _router: Router) {
    this.location = _router.url;
    this.createForm();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    /*
        this.service.getDiscountType().subscribe((data: SubCategories[]) => {
          this.subcategories = data;
        });
    */

    this.service.listAll().subscribe((data: Tests[]) => {
      this.objlist = data;

      this.service.getCategory().subscribe((data: Categories[]) => {
        this.categories = data;


        this.service.getSubCategory().subscribe((data: SubCategories[]) => {
          this.subcategories = data;

          this.service.getPartner().subscribe((data: Partners[]) => {
            this.partners = data;

            for(let item of this.objlist){

              for(let obj of this.subcategories){
                if(obj.id==item.lab_sub_category_id){
                  item.lab_sub_category_name=obj.lab_sub_category_name;
                }
              }

              for(let obj of this.partners){
                if(obj.id==item.lab_partner_id){
                  item.lab_partner_name=obj.name;
                }
              }

            }


          });//partners
        });//subcategories
      });//categories
      /*



*/
      this.dtTrigger.next();
    });
  }

  createForm() {
    this.angForm = this.fb.group({
      lab_sub_category_id: ['', Validators.required],
      lab_test_cost: ['', Validators.required],
      lab_testcode_id: ['', Validators.required],
      lab_test_name: ['', Validators.required],
      method: [''],
      sample_volume_vaccutainer: [''],
      temp: [''],
      cut_off_time: [''],
      schd: [''],
      reporting: [''],
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
    this.service.update(obj)

  }

  remove(id) {
    if (confirm("Are you sure you want to delete") == true) {
    this.service.remove(id)
    this.dtTrigger.unsubscribe();
    this.ngOnInit()
    }
  }
  //copy all above



  getPartner() {
    this.service.getPartner();
  }

  /*
  getPartnerShareType() {
    this.service.getPartnerShareType();
  }
  getDiscountType(){
    this.service.getDiscountType();
  }
  getCategory(){
    this.service.getCategory();
  }
  getSubCategory(){
    this.service.getSubCategory();
  }


  */

}
