import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder,  Validators, FormArray } from '@angular/forms';
import {Router} from '@angular/router';
import {ConsultationservicesService} from './consultationservices.service'
import ConsultationService from './consultationservice'
import { environment } from '../../../../environments/environment';
import ConsultantService from './consultantservice';

@Component({
  selector: 'app-consultationservices',
  templateUrl: './consultationservices.component.html',
  styleUrls: ['./consultationservices.component.css']
})

export class ConsultationservicesComponent implements OnInit {
  addForm = new FormGroup ({
    name: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required)
  });

  serviceMap = new FormGroup ({
    consultant: new FormControl('',Validators.required),

  })

  public location = '' ;
  objadd:{[k: string]: any} = {};
  objlist:{[k: string]: any}[];
  objedit:{[k: string]: any} ={};
  dtOptions: DataTables.Settings = {};
  formvalue: {[k: string]: any} = environment.services.consultantservice;
  rows: FormArray;
  consultantlist:{[k: string]: any}[];
  dtTrigger: Subject<ConsultationService> = new Subject();
  dtTrigger1: Subject<ConsultantService> = new Subject();
  consultantservicelist:{[k: string]: any}[];

 constructor(private service: ConsultationservicesService, private http: HttpClient, private fb: FormBuilder,  public _router : Router) {
   this.location = _router.url;
   //
   //this.createForm();
   //this.addForm = this.fb.group({
   //  consultant: [null, Validators.required],
   //  });
   //
   this.rows = this.fb.array([]);
 }

 ngOnInit() {
  this.onAddRow();
  this.serviceMap.addControl('rows', this.rows);

  this.service.listAll().subscribe((data:{[k: string]: any}[]) => {
    this.objlist=data;
    this.dtTrigger.next();
   });

   this.service.listAllConsultants().subscribe((data:{[k: string]: any}[]) => {
    this.consultantlist=data;
     });

     this.service.listAllConsultantServices().subscribe((data:{[k: string]: any}[]) => {
      var index = 0;
      this.consultantservicelist=data;
      for(let obj of data){
        for(let obj1 of this.consultantlist){
          if((obj1['id']==obj['consultant_id'])){
            this.consultantservicelist[index]['consultant']=obj1['name']
          }

          for(let obj1 of this.objlist){
            //alert(JSON.stringify(obj['consultation_service_id']));
            if(obj1['id']==obj['consultation_service_id']){
              //alert(obj1['name'])
              this.consultantservicelist[index]['consultation_service']=obj1['name'];
            }
      }
      }
      index++;
    }
      this.dtTrigger1.next();
       });

  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10
  };
 }

 add() {
  this.service.add(this.addForm.value);
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

removeServiceMap(id){
  //alert(id)
  if (confirm("Are you sure you want to delete") == true) {
  this.service.removeServiceMap(id)
  this.dtTrigger1.unsubscribe();
  this.ngOnInit();
  }
}


onAddRow() {
  this.rows.push(this.createItemFormGroup());
}

onRemoveRow(rowIndex:number){
  this.rows.removeAt(rowIndex);
}

//allows to fetch data in backend
createItemFormGroup(): FormGroup {
  return this.fb.group({
    service: null,
    fee: null,
    consultant_share_type: null,
    consultant_share: null,
    gst:null
  });
}

addService(){
  var jsonobj = this.serviceMap.get("rows").value
  for (let obj of this.consultantlist){
    if(this.serviceMap.get('consultant').value == obj.name)
      jsonobj['consultant_id']=obj.id
  }

  for(let item of jsonobj){
    for(let obj of this.objlist){
      if(item['service']==obj.name){
        item['consultation_service_id']=obj.id
        //alert(item['service'])
      }
    }

    item['consultant_id']=jsonobj['consultant_id']
    //alert(JSON.stringify(item))
    var result = this.service.addService(item)
    if(result == 1)
      alert("Something went wrong in insertion")

    else
      alert("Service added successfully")
  }

}

}
