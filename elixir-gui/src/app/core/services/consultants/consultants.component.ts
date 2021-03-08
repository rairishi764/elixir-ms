import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ConsultantsService } from './consultants.service';
import Consultants from './consultants';
import {Router} from '@angular/router';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import Specialization  from '../specialization/specialization';

@Component({
  selector: 'app-consultants',
  templateUrl: './consultants.component.html',
  styleUrls: ['./consultants.component.css']
})

export class ConsultantsComponent implements OnInit {
  public location = '' ;
  angForm: FormGroup;
  consultants: Consultants[];
  objedit: {[k: string]: any} = {};
  objadd:{[k: string]: any} = {};
  dtOptions: DataTables.Settings = {};
  dept: Specialization[];


   // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<Consultants> = new Subject();

  constructor(private fb: FormBuilder, private service: ConsultantsService, public _router : Router)
  {
    this.location = _router.url;
    this.createForm();

  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      qualification: ['', Validators.required ],
      medical_id: ['', Validators.required ],
      lab_category_id:['', Validators.required ],
      phone: ['', Validators.required ],
      address: ['', Validators.required ],
      records: ['', Validators.required ],
      dob: ['', Validators.required ],
      title:['',Validators.required],
      mail:['', Validators.required ],
      pwd:[''],
      reg_body:[''],
      access_type:[1],
      colorcode:[''],
      workhrs:["{\"Monday\":[[0900,1200],[1400,1600]],\"Tuesday\":[],\"Wednesday\":[[0900,1200]],\"Thursday\":[[1200,1600]],\"Friday\":[[0900,1200],[1400,1600]],\"Saturday\":[[0900,1200]],\"Sunday\":[]}"]
    });
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.service.listCategories().subscribe((data: Specialization[]) => {
      this.dept = data;
    });

    this.service.listAll().subscribe((data: Consultants[]) => {
        this.consultants = data;
        var index=0;
        for(let obj of this.consultants){

          for(let dep of this.dept){
            if(dep.id==obj.department_id){
            this.consultants[index].department_name = dep.name;
            index++;
          }
          }

          obj.workhrsJson = JSON.parse(obj.workhrs)

        }
          // Calling the DT trigger to manually render the table
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
    this.service.update(obj)

  }

  remove(id){
    if (confirm("Are you sure you want to delete") == true) {
    this.service.remove(id)
    this.dtTrigger.unsubscribe();
    this.ngOnInit()
    }
  }

}
