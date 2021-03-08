//copy as is
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { LabinvoiceService } from './labinvoice.service';
import { FormControl, FormArray, NgForm } from '@angular/forms';
import Labinvoiceserviceitem from "./labinvoiceserviceitem";
import Category from '../categories/categories';
import SubCategory from '../subcategories/subcategories';
import Tests from '../tests/tests';
import SubCategories from '../subcategories/subcategories';
import Patients from '../../patients/patients';
import Labinvoice from '../labinvoice/labinvoice';
import Consultant from '../../consultants/consultants';
import Partners from '../partners/partners';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import  PartnerServiceList  from '../partners/partnerservice';
import PartnerService from '../partners/partnerservice';
import {environment} from '../../../../../environments/environment';

import Mail from './mail';
@Component({
  selector: 'app-labinvoice',
  templateUrl: './labinvoice.component.html',
  styleUrls: ['./labinvoice.component.css']
})
export class LabinvoiceComponent implements OnInit {
  clientDetails= environment.clientdetails;
  invpatient: Patients= new Patients();
  isChecked = false;
  mail:Mail= new Mail();
  public location = '';
  angForm: FormGroup;
  editForm:FormGroup;
  objadd: { [k: string]: any } = {};
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Labinvoice> = new Subject();
  objlist: Labinvoice[];
  serviceobj: Labinvoiceserviceitem;
  servicelist: Labinvoiceserviceitem[];
  parsedJson: any;
  currentDate: Date = new Date();
  patientlist: Patients[];
  data: any;
  addForm: FormGroup;
  rows: FormArray;
  itemForm: FormGroup;
  categorieslist: Category[];
  rowcategorieslist: Category[];
  subcategorieslist: SubCategories[];
  rowsubcategorieslist: SubCategories[];
  rowpartnerservicelist: PartnerService[];
  partnerservicelist:PartnerService[];
  testlist: Tests[];
  rowtestlist: Tests[];
  rowpartnerlist:Partners[];
  labinvoice: Labinvoice;
  consultantlist: Consultant[];
  partnerlist: Partners[];
  public location1 = '';
  invoice: Labinvoice;
  labinvoiceserviceitem: Labinvoiceserviceitem[];
  objedit: { [k: string]: any } = {};

  constructor(private fb: FormBuilder,
    private service: LabinvoiceService,
    public router: Router,
    public activatedRoute: ActivatedRoute) {
    this.add = this.add.bind(this);
    this.location = router.url;

    this.addForm = this.fb.group({
      patient_id: ['', Validators.required],
      items: [null, Validators.required],
      items_value: ['yes', Validators.required],
      total_amt: [0, Validators.required],
      discount_percent: [0, Validators.required],
      discount_amt: [0, Validators.required],
      advance: [0, Validators.required],
      pending_amt: [0, Validators.required],
      due_amt: [0, Validators.required],
      payment_mode: [1, Validators.required],
      discount_type:'',
      total_amt_after_discount:0
    });
    this.rows = this.fb.array([]);
    this.createForm();
  }

  ngOnInit(): void {
    this.onAddRow();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.service.listAllPatients().subscribe((data: Patients[]) => {
      this.patientlist = data;
    });

    this.service.listAll().subscribe((data: Labinvoice[]) => {
      this.objlist = data;

      for (let invindex = 0; invindex < this.objlist.length; invindex++) {
        this.objlist[invindex].servicesList = [];
        var obj1 = JSON.parse(this.objlist[invindex].services);
        var serviceindex = 0;
        obj1.forEach(obj => {
          this.serviceobj = obj;
          this.objlist[invindex].servicesList[serviceindex] = this.serviceobj;
          serviceindex++;
        });
      }

      this.dtTrigger.next();
      this.addForm.addControl('rows', this.rows);
    });

    this.activatedRoute.queryParams.subscribe(params => {
      let id = params['object'];
      if (id != null) {
        this.service.getInvoiceById(id).subscribe((data: Labinvoice) => {
          this.labinvoice = data[0];
          for(let patient of this.patientlist){
            if(patient.id==this.labinvoice.patient_id){
              this.labinvoice.patientmail=patient.mail;
            }
          }
          this.labinvoice.servicesList = JSON.parse(this.labinvoice.services);
        });
      }
    });

    this.addForm.get("items").valueChanges.subscribe(val => {
      if (val === true) {
        this.addForm.get("items_value").setValue("yes");
        this.addForm.addControl('rows', this.rows);
      }
      if (val === false) {
        this.addForm.get("items_value").setValue("no");
        this.addForm.removeControl('rows');
        this.addForm.removeControl('patient');
      }
    });

    this.service.getCategory().subscribe((data: Category[]) => {
      this.categorieslist = data;
      this.rowcategorieslist = data;
    });

    this.service.getSubCategory().subscribe((data: SubCategory[]) => {
      this.subcategorieslist = data;
      this.rowsubcategorieslist = data;
    });

    this.service.getTest().subscribe((data: Tests[]) => {
      this.testlist = data;
      this.rowtestlist = data;
    });

    this.service.getPatients().subscribe((data: Patients[]) => {
      this.patientlist = data;
    });

    this.service.getConsultants().subscribe((data: Consultant[]) => {
      this.consultantlist = data;
    });

    this.service.getPartner().subscribe((data: Partners[]) => {
      this.partnerlist = data;
    });

    this.service.getPartnerService().subscribe((data: PartnerServiceList[]) => {
      this.partnerservicelist = data;
      this.rowpartnerservicelist=this.partnerservicelist;
    });
  }

  createForm() {
    this.angForm = this.fb.group({
      patient: ['', Validators.required]
    });

    this.editForm = this.fb.group({
      advance:[0, Validators.required],
      due_amt:[0, Validators.required]
    });
  }

  remove(id) {
    if (confirm("Are you sure you want to delete") == true) {
    this.service.remove(id)
    this.dtTrigger.unsubscribe();
    this.ngOnInit()
    }
  }

  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }

  onRemoveRow(rowIndex: number) {
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      lab_category_name: '',
      lab_subcategory_name: '',
      consultant_name: '',
      test: '',
      partner: '',
      qty: 0,
      test_cost: 0,
      subtotal: 0,
      discounted_subtotal:0,
      partner_share:0,
      partner_share_type:'',
      center_share_value:0,
      partner_share_value:0
    });
  }

  calculate(row) {
    row.get('subtotal').setValue(
      row.get('qty').value * row.get('test_cost').value
    );
    row.get('discounted_subtotal').setValue(
      row.get('subtotal').value - (this.addForm.get("discount_percent").value * 0.01*row.get('subtotal').value)
    );

    this.totalcalculation();
    this.calculatediscount();
  }

  calculatediscount() {
    this.addForm.get("discount_amt").
      setValue(this.addForm.get("discount_percent").value * 0.01 * this.addForm.get("total_amt").value);

    this.addForm.get("due_amt").
      setValue(this.addForm.get("total_amt").value - this.addForm.get("discount_amt").value - this.addForm.get("advance").value);

    this.addForm.get("total_amt_after_discount").
      setValue(this.addForm.get("total_amt").value - this.addForm.get("discount_amt").value);
    }

  add() {
    this.labinvoice = this.addForm.value;
    for (let item of this.patientlist) {
      if (item.id == this.addForm.get("patient_id").value) {
        this.labinvoice.patient_name = item.name;
        let date = new Date(item.dob)
        this.labinvoice.patient_age = this.calculateage(date).toString();
        this.labinvoice.patient_gender = item.gender;
        this.labinvoice.patient_number = item.phone.toString();
        this.labinvoice.patientmail = item.mail;
      }
    }
    this.service.add(this.labinvoice).subscribe((data: number) => {
      this.navigateWithparam(data,"print");

    });
  }

  totalcalculation() {
    var total = 0;
    if(this.addForm.get("discount_type").value==0){ //no discount
    for (let row of this.addForm.get('rows')['controls']) {
      total = total + row.get('subtotal').value;
      if(row.get('partner_share_type').value=="fixed"){
        row.get('partner_share_value').setValue(row.get('partner_share').value*row.get('qty').value);
        row.get('center_share_value').setValue(row.get('subtotal').value-row.get('partner_share_value').value);
      }
      else{
        row.get('partner_share_value').setValue(row.get('partner_share').value*0.01*row.get('subtotal').value);
        row.get('center_share_value').setValue(row.get('subtotal').value-row.get('partner_share_value').value);
      }
    }
    this.addForm.get("total_amt").setValue(total);
  }

  if(this.addForm.get("discount_type").value==1){// center discount
    var discount_percent = this.addForm.get("discount_percent").value;
    for (let row of this.addForm.get('rows')['controls']) {
      total = total + row.get('subtotal').value;
      if(row.get('partner_share_type').value=="fixed"){
        row.get('partner_share_value').setValue(row.get('partner_share').value*row.get('qty').value);

        row.get('center_share_value').setValue(row.get('discounted_subtotal').value-row.get('partner_share_value').value);
      }
      else{
        row.get('partner_share_value').setValue(row.get('partner_share').value*0.01*row.get('subtotal').value);
        row.get('center_share_value').setValue(row.get('discounted_subtotal').value-row.get('partner_share_value').value);
      }
    }
    this.addForm.get("total_amt").setValue(total);
  }


  if(this.addForm.get("discount_type").value==2){// partner discount
    var discount_percent = this.addForm.get("discount_percent").value;
    for (let row of this.addForm.get('rows')['controls']) {
      total = total + row.get('subtotal').value;
      if(row.get('partner_share_type').value=="fixed"){
        row.get('partner_share_value').setValue(row.get('partner_share').value*row.get('qty').value
        -(row.get('subtotal').value-row.get('discounted_subtotal').value));
        row.get('center_share_value').setValue(row.get('discounted_subtotal').value-row.get('partner_share_value').value);
      }
      else{
        row.get('partner_share_value').setValue(row.get('partner_share').value*0.01*row.get('subtotal').value
        -(row.get('subtotal').value-row.get('discounted_subtotal').value));
        row.get('center_share_value').setValue(row.get('discounted_subtotal').value-row.get('partner_share_value').value
        );
      }
    }
    this.addForm.get("total_amt").setValue(total);
  }

  if(this.addForm.get("discount_type").value==3){ //no discount
    for (let row of this.addForm.get('rows')['controls']) {
      var discount_percent = this.addForm.get("discount_percent").value;
      total = total + row.get('subtotal').value;
      if(row.get('partner_share_type').value=="fixed"){
        row.get('partner_share_value').setValue((row.get('partner_share').value*row.get('qty').value) * (100-discount_percent)*0.01);
        row.get('center_share_value').setValue((row.get('subtotal').value-(row.get('partner_share').value*0.01*row.get('subtotal').value))* (100-discount_percent)*0.01);
      }
      else{
        row.get('partner_share_value').setValue((row.get('partner_share').value*0.01*row.get('subtotal').value)* (100-discount_percent)*0.01);
        row.get('center_share_value').setValue((row.get('subtotal').value-(row.get('partner_share').value*0.01*row.get('subtotal').value))* (100-discount_percent)*0.01);
      }
    }
    this.addForm.get("total_amt").setValue(total);
  }
  }

  navigateWithparam(obj,action): void {
    const queryParams: any = {};
    queryParams.object = JSON.stringify(obj);
    const navigationExtras: NavigationExtras = {
      queryParams
    };
    if(action=="print"){
      this.router.navigate(['labinvoice/print'], navigationExtras);
    }

    if(action=="edit"){
      this.router.navigate(['labinvoice/edit'], navigationExtras);
    }
  }

  calculateage(dob) {
    let timeDiff = Math.abs(Date.now() - dob);
    let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    return age;
  }

  calculatefinal(obj){
   var due_amt=this.objedit.total_cost-this.objedit.discount_amt-this.editForm.get('advance').value;
   this.editForm.get("due_amt").setValue( due_amt);
  }

  updateview(obj) {
    this.objedit = obj;
  }

  update(obj) {
    this.service.update(obj);
   // this.ngOnInit();
  }

  print(){
    window.print()
    //this.sendmail()
 }

  categoryfilter(row) {
    if(row.get('lab_category_name').value!=''){
      this.rowsubcategorieslist=[];
    }
    else
      this.rowsubcategorieslist=this.subcategorieslist;

    for (let obj of this.categorieslist){
      if(obj.lab_category_name==row.get('lab_category_name').value){
             for(let subobj of this.subcategorieslist){
               if(subobj.lab_category_id== obj.lab_category_id){
                 this.rowsubcategorieslist.push(subobj);
               }
             }
      }
    }

  }

  subcategoryfilter(row) {
    if(row.get('lab_subcategory_name').value!=''){
      this.rowtestlist=[];
    }
    else
      this.rowtestlist=this.testlist;

    for (let obj of this.subcategorieslist){
      if(obj.lab_sub_category_name==row.get('lab_subcategory_name').value){
          for(let category of this.categorieslist){
            if(category.lab_category_id==obj.lab_category_id){
              row.get('lab_category_name').setValue(category.lab_category_name);
            }
          }
             for(let testobj of this.testlist){
               if(testobj.lab_sub_category_id== obj.id){
                 this.rowtestlist.push(testobj);
               }
             }
      }
    }
  }

testfilter(row){
  if(row.get('test').value!=''){
    this.rowpartnerservicelist=[];
  }
  for(let obj of this.testlist){
    if(obj.lab_test_name==row.get('test').value){
      for(let subtcategory of this.subcategorieslist ){
        if(subtcategory.id==obj.lab_sub_category_id)
        row.get('lab_subcategory_name').setValue(subtcategory.lab_sub_category_name);

        for(let category of this.categorieslist){
          if(category.lab_category_id==subtcategory.lab_category_id)
          row.get('lab_category_name').setValue(category.lab_category_name);
        }
      }

      for( let partnerserviceobj of this.partnerservicelist){
        if(partnerserviceobj.test_id==obj.id){
          for(let partnerobj of this.partnerlist){
            if(partnerobj.id==partnerserviceobj.partner_id){
              partnerserviceobj.partner=partnerobj.name;
              this.rowpartnerservicelist.push(partnerserviceobj);
              this.rowpartnerservicelist = Array.from(new Set(this.rowpartnerservicelist))
              }
            }
          }
        }
    }
  }
}

partnerfilter(row){
  var partnerid;
  var testid;
  for(let partnerobj of this.partnerlist){
    if(partnerobj.name==row.get('partner').value)
      partnerid=partnerobj.id;
  }

  for(let testobj of this.testlist){
    if(testobj.lab_test_name==row.get('test').value)
      testid=testobj.id;
  }

  for(let serv of this.partnerservicelist){
    if(serv.test_id==testid && serv.partner_id==partnerid){
      row.get('test_cost').setValue(serv.price);
      row.get('partner_share_type').setValue(serv.partner_share_type);
      row.get('partner_share').setValue(serv.partner_share);

    }
  }
}

sendmail(obj){
  var printContents = document.getElementById('invoice').innerHTML;
  this.mail.mailbody=`${printContents}`
  this.mail.mailtxt='Hi,\n Please find your invoice from your visit below';
  this.mail.receiver=this.labinvoice.patientmail;
  this.mail.sender_mail='toofani.tech.elixir@gmail.com';
  this.mail.subject='Elixir Invoice';
  this.mail.receiver=obj.patientmail;
  this.service.sendmail(this.mail);
}
}
