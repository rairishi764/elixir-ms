//copy as is
import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {Router, RouterEvent} from '@angular/router';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
//copy all above
import { PartnersService } from './partners.service';
import Tests from '../tests/tests';
//import  { TestingService }  from './testing.service';
import Partners from './partners';
import {HttpClient } from '@angular/common/http'
import {  FormArray} from '@angular/forms'
import PartnerService from './partnerservice'

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
//copy as is
public location = '' ;
angForm: FormGroup;
editForm: FormGroup;
objedit: {[k: string]: any} = {};
objservedit:{[k: string]: any} = {};
objadd:{[k: string]: any} = {};
dtOptions: DataTables.Settings = {};
//copy as above
dtTrigger: Subject<Partners> = new Subject();
dtOptions1: DataTables.Settings = {};
dtTrigger1: Subject<Partners> = new Subject();
objlist: Partners[];
partnerServiceList : PartnerService[]=[];
partnerServices : PartnerService[];

addForm: FormGroup;
testlist: Tests[];
rows: FormArray;
itemForm: FormGroup;
testList: Tests[];

constructor(private fb: FormBuilder, private service: PartnersService, public _router : Router) {
  this.location = _router.url;
  this.createForm();
  this.addForm = this.fb.group({
    partner: [null, Validators.required],
    items: [null, Validators.required],
    items_value: ['no', Validators.required]
  });

  this.rows = this.fb.array([]);

}

ngOnInit() {
  this.onAddRow();
  this.addForm.addControl('rows', this.rows);

  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10
  };

  this.dtOptions1 = {
    pagingType: 'full_numbers',
    pageLength: 10
  };

    this.service.listAll().subscribe((data: Partners[]) => {
    this.objlist = data;
    this.dtTrigger.next();
});

this.service.listAllTests().subscribe((data: Tests[]) => {
  this.testList = data;
});

this.service.listAllServices().subscribe((data: PartnerService[]) => {
  this.partnerServices = data;
  var i =0;
  var j =0;
  for(let obj of this.partnerServices){
    for(let item of this.objlist){
      if (item.id==obj.partner_id){
        this.partnerServices[i].partner=item.name;
        i++;
      }
    }
      for(let item of this.testList){
        if(item.id== obj.test_id){
          this.partnerServices[j].test=item.lab_test_name;
          j++;
        }
      }


  }
  this.dtTrigger1.next();

});


this.service.listTests().subscribe((data: Tests[]) => {
  this.testlist = data;
});
}

createForm() {
  this.angForm = this.fb.group({
    name: ['', Validators.required ]
  });

  this.editForm = this.fb.group({
    partner_id: ['', Validators.required ],
    test_id: ['', Validators.required ],
    test_code: ['', Validators.required ],
    price: ['', Validators.required ],
    partner_share_type: ['', Validators.required ],
    partner_share: ['', Validators.required ],
    gst:['', Validators.required ]
  });
}

//copy as is
add(obj) {
  this.service.add(obj);
}

updateview(obj){
  this.objedit=obj;
}

updateServiceView(obj){
  this.objservedit=obj;
}

update(obj){
  this.service.update(obj)
}

updateserv(obj){
  this.service.updateserv(obj)
}

remove(id){
  if (confirm("Are you sure you want to delete") == true) {
  this.service.remove(id)
  this.dtTrigger.unsubscribe();
  this.ngOnInit()
  }
}
//copy all above

onAddRow() {
  this.rows.push(this.createItemFormGroup());
}

onRemoveRow(rowIndex:number){
  this.rows.removeAt(rowIndex);
}

//allows to fetch data in backend
createItemFormGroup(): FormGroup {
  return this.fb.group({
    test: null,
    test_code: null,
    price: null,
    partner_share_type: null,
    partner_share: null,
    gst:0
  });
}

addService(){
  var partnerid = 0;
  for(let partner of this.objlist){
    if(partner.name == this.addForm.get('partner').value){
      partnerid=partner.id
    }
  }
var index = 0;
  for(let row of this.addForm.get('rows').value)
  {
    this.partnerServiceList[index] = row;
    this.partnerServiceList[index].partner_id=partnerid;

    for (let test of this.testlist){
      if(this.partnerServiceList[index].test==test.lab_test_name){
        this.partnerServiceList[index].test_id=test.id;

      }
    }
    index++;
  }
  this.service.addpartnerService(this.partnerServiceList);

}

removeService(id){
  if (confirm("Are you sure you want to delete") == true) {
  this.service.removeService(id)
  this.dtTrigger1.unsubscribe();
  }
}

}

