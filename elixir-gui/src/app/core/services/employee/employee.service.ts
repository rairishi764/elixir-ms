import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  uri = environment.deployment.labApi;

  constructor(private http: HttpClient) { }
  add(obj) {
    console.log(obj);
    this.http.post(`${this.uri}employee/`,obj)
    .subscribe(suc => {
      alert("Successfully added.");
  },
  err => {
     alert("Error in adding.");
  });
  }

  listAll() {
    return this.http.get(`${this.uri}employee/`);
  }

  remove(id){
    console.log(id);
    this.http.delete(`${this.uri}employee/`+id)
        .subscribe(suc => {
          alert("Successfully deleted.");
      },
      err => {
         alert("Error in deleting.");
      });

  }

  update(obj){
    this.http.put(`${this.uri}employee/`+obj.id,obj).subscribe(suc => {
      alert("Successfully updated.");
  },
  err => {
     alert("Error in updating.");
  });
  }

}
