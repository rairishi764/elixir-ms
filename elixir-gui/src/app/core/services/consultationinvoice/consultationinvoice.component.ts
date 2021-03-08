//copy as is
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { FormControl, FormArray, NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { ConsultationinvoiceService } from './consultationinvoice.service';
import Patients from '../patients/patients';
import Mail from '../lab/labinvoice/mail';
import Consultinvoice from './consultationinvoice';
import Consultinvoiceitem from './consultinvoiceitem';
import Consultant from '../consultants/consultants';
import Consultationservice from '../consultationservices/consultationservice';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-consultationinvoice',
  templateUrl: './consultationinvoice.component.html',
  styleUrls: ['./consultationinvoice.component.css']
})
export class ConsultationinvoiceComponent implements OnInit {
  clientDetails= environment.clientdetails;
  invpatient: Patients= new Patients();
  isChecked = false;
  mail:Mail= new Mail();
  public location = '';
  angForm: FormGroup;
  editForm:FormGroup;
  objadd: { [k: string]: any } = {};
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Consultinvoice> = new Subject();
  objlist: {[k: string]: any}[] = [];
  serviceobj: Consultinvoiceitem;
  servicelist: Consultinvoiceitem[];
  rowservicelist:Consultinvoiceitem[];

  parsedJson: any;
  currentDate: Date = new Date();
  patientlist: Patients[];
  data: any;
  addForm: FormGroup;
  rows: FormArray;
  itemForm: FormGroup;
  consultantlist: {[k: string]: any}[] = [];
  rowconsultantlist:{[k: string]: any}[] = [];
  price:number = 0
  public location1 = '';
  invoice: {[k: string]: any} = {};
  invoiceitem: {[k: string]: any}[] = [];
  objedit: { [k: string]: any } = {};
  consultationservicelist:{[k: string]: any}[] = [];
  consultantservicemap:{[k: string]: any}[] = [];

  constructor(private fb: FormBuilder,
    private service: ConsultationinvoiceService,
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

    this.service.listAll().subscribe((data: {[k: string]: any}[]) => {
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
      //alert(id)
      if (id != null) {
        this.service.getInvoiceById(id).subscribe((data: {[k: string]: any}) => {
          //alert("XXX"+JSON.stringify(data))
          this.invoice = data[0];
          //alert(JSON.stringify(this.invoice))
          for(let patient of this.patientlist){
            //alert(patient.id)
            if(patient.id==this.invoice.patient_id){
              this.invoice.patientmail=patient.mail;
              //alert(this.invoice.patientmail)

            }
          }
          this.invoice.servicesList = JSON.parse(this.invoice.services);
        });
      }
      //alert(JSON.stringify(this.invoice))
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
/* Replace with service
    this.service.getCategory().subscribe((data: Category[]) => {
      this.categorieslist = data;
      this.rowcategorieslist = data;
    });
*/

    this.service.getPatients().subscribe((data: Patients[]) => {
      this.patientlist = data;
    });

    this.service.getConsultants().subscribe((data: Consultant[]) => {
      this.consultantlist = data;
    });

    this.service.getConsultationService().subscribe((data: Consultationservice[]) => {
      this.consultationservicelist = data;
      //alert(JSON.stringify(this.consultationservicelist))
    });

    this.service.getConsultantServiceMap().subscribe((data: any)=> {
      this.consultantservicemap = data;
      //alert(JSON.stringify(this.consultationservicelist));
      var index = 0;
      for(let obj of this.consultantservicemap)
      {
        for(let obj1 of this.consultationservicelist){
          //alert(JSON.stringify(obj1.name));
          //alert(JSON.stringify(obj));
          if(obj.consultation_service_id==obj.id){
            //alert("matched");
            //this.consultantservicemap[index]['service_name']=obj1.name;
            //alert(JSON.stringify(this.consultantservicemap[index]));
          //alert(JSON.stringify(this.consultantservicemap[index]))
        }
        }
        index++;
      }
      //alert(JSON.stringify(this.consultantservicemap))
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
      service: '',
      consultant_name: '',
      qty: 0,
      price: 0,
      subtotal: 0,
      discounted_subtotal:0,
      consultant_share:0,
      consultant_share_type:'',
      center_share_value:0,
      consultant_share_value:0
    });
  }

  calculate(row) {
    row.get('subtotal').setValue(
      row.get('qty').value * row.get('price').value
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
    this.invoice = this.addForm.value;
    for (let item of this.patientlist) {
      if (item.id == this.addForm.get("patient_id").value) {
        this.invoice.patient_name = item.name;
        let date = new Date(item.dob)
        this.invoice.patient_age = this.calculateage(date).toString();
        this.invoice.patient_gender = item.gender;
        this.invoice.patient_number = item.phone.toString();
        this.invoice.patientmail = item.mail;
      }
    }
    this.service.add(this.invoice).subscribe((data: number) => {
      this.navigateWithparam(data,"print");

    });
  }

  totalcalculation() {
    var total = 0;
    if(this.addForm.get("discount_type").value==0){ //no discount
    for (let row of this.addForm.get('rows')['controls']) {
      total = total + row.get('subtotal').value;
      if(row.get('consultant_share_type').value=="fixed"){
        row.get('consultant_share_value').setValue(row.get('consultant_share').value*row.get('qty').value);
        row.get('center_share_value').setValue(row.get('subtotal').value-row.get('consultant_share_value').value);
      }
      else{
        row.get('consultant_share_value').setValue(row.get('consultant_share').value*0.01*row.get('subtotal').value);
        row.get('center_share_value').setValue(row.get('subtotal').value-row.get('consultant_share_value').value);
      }
    }
    this.addForm.get("total_amt").setValue(total);
  }

  if(this.addForm.get("discount_type").value==1){// center discount
    var discount_percent = this.addForm.get("discount_percent").value;
    for (let row of this.addForm.get('rows')['controls']) {
      total = total + row.get('subtotal').value;
      if(row.get('consultant_share_type').value=="fixed"){
        row.get('consultant_share_value').setValue(row.get('consultant_share').value*row.get('qty').value);

        row.get('center_share_value').setValue(row.get('discounted_subtotal').value-row.get('consultant_share_value').value);
      }
      else{
        row.get('consultant_share_value').setValue(row.get('consultant_share').value*0.01*row.get('subtotal').value);
        row.get('center_share_value').setValue(row.get('discounted_subtotal').value-row.get('consultant_share_value').value);
      }
    }
    this.addForm.get("total_amt").setValue(total);
  }


  if(this.addForm.get("discount_type").value==2){// consultant discount
    var discount_percent = this.addForm.get("discount_percent").value;
    for (let row of this.addForm.get('rows')['controls']) {
      total = total + row.get('subtotal').value;
      if(row.get('consultant_share_type').value=="fixed"){
        row.get('consultant_share_value').setValue(row.get('consultant_share').value*row.get('qty').value
        -(row.get('subtotal').value-row.get('discounted_subtotal').value));
        row.get('center_share_value').setValue(row.get('discounted_subtotal').value-row.get('consultant_share_value').value);
      }
      else{
        row.get('consultant_share_value').setValue(row.get('consultant_share').value*0.01*row.get('subtotal').value
        -(row.get('subtotal').value-row.get('discounted_subtotal').value));
        row.get('center_share_value').setValue(row.get('discounted_subtotal').value-row.get('consultant_share_value').value
        );
      }
    }
    this.addForm.get("total_amt").setValue(total);
  }

  if(this.addForm.get("discount_type").value==3){ //no discount
    for (let row of this.addForm.get('rows')['controls']) {
      var discount_percent = this.addForm.get("discount_percent").value;
      total = total + row.get('subtotal').value;
      if(row.get('consultant_share_type').value=="fixed"){
        row.get('consultant_share_value').setValue((row.get('consultant_share').value*row.get('qty').value) * (100-discount_percent)*0.01);
        row.get('center_share_value').setValue((row.get('subtotal').value-(row.get('consultant_share').value*0.01*row.get('subtotal').value))* (100-discount_percent)*0.01);
      }
      else{
        row.get('consultant_share_value').setValue((row.get('consultant_share').value*0.01*row.get('subtotal').value)* (100-discount_percent)*0.01);
        row.get('center_share_value').setValue((row.get('subtotal').value-(row.get('consultant_share').value*0.01*row.get('subtotal').value))* (100-discount_percent)*0.01);
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
      this.router.navigate(['consultinvoice/print'], navigationExtras);
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

 servicefilter(row) {
  this.rowconsultantlist = []
   if(row.get('service').value!=''){
    }
    else
      this.rowconsultantlist=this.consultantlist;

    for (let obj of this.consultationservicelist){
      if(obj.name==row.get('service').value){
          var id = obj.id
          for (let obj1 of this.consultantservicemap){
            if(id == obj1.consultation_service_id){
              //alert(JSON.stringify(this.consultantlist))
              for(let consultant of this.consultantlist){
                //alert(JSON.stringify(consultant))
                if(consultant.id == obj1.consultant_id){
                   //alert(JSON.stringify(consultant))
                  this.rowconsultantlist.push(consultant);
                }
                //alert(JSON.stringify(this.rowconsultantlist))
              }
              //alert(JSON.stringify(obj1))
            }


             }
      }
    }
    this.rowconsultantlist = this.rowconsultantlist.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
  })

  }

  consultantfilter(row) {
    for (let obj of this.consultationservicelist){
      if(row.get('service').value==obj['name']){
        for(let obj1 of this.consultantlist){
          if(obj1['name']==row.get('consultant_name').value){
            for(let obj2 of this.consultantservicemap){
              if(obj2['consultation_service_id']==obj['id']&&obj1['id']==obj2['consultant_id']){
                  row.get('price').setValue(obj2['fee']);
                  row.get('consultant_share_type').setValue(obj2['consultant_share_type']);
                  row.get('consultant_share').setValue(obj2['consultant_share']);

              }

            }

          }
        }
      }
    }
  }
sendmail(obj){
  var printContents = document.getElementById('invoice').innerHTML;
  this.mail.mailbody=`${printContents}`
  this.mail.mailtxt='Hi,\n Please find your invoice from your visit below';
  this.mail.receiver=this.invoice.patientmail;
  this.mail.sender_mail='toofani.tech.elixir@gmail.com';
  this.mail.subject='Elixir Invoice';
  this.mail.receiver=obj.patientmail;
  this.service.sendmail(this.mail);
}
}
