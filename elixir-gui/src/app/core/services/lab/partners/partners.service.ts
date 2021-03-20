import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class PartnersService {
  uri = environment.deployment.labApi;
  constructor(private http: HttpClient) { }

  add(obj) {
    this.http.post(`${this.uri}partner/`,obj)
    .subscribe(suc => {
      alert("Successfully added.");

  },
  err => {
     alert("Error in adding.");
  });
  }

  listAll() {
    return this.http.get(`${this.uri}partner/`);
  }

  listAllServices() {
    return this.http.get(`${this.uri}partnerservice/`);
  }

  listAllTests() {
    return this.http.get(`${this.uri}`+"labtest");
  }

  remove(id){
    this.http.delete(`${this.uri}partner/`+id)
        .subscribe(suc => {
          alert("Successfully deleted.");

      },
      err => {
         alert("Error in deleting.");
      });
  }

  removeService(id){
    this.http.delete(`${this.uri}partnerservice/`+id)
    .subscribe(suc => {
      alert("Successfully deleted.");

  },
  err => {
     alert("Error in deleting.");
  });
  }

  update(obj){
    this.http.put(`${this.uri}partner/`+obj.id,obj).subscribe(suc => {
      alert("Successfully updated.");

  },
  err => {
     alert("Error in updating.");
  });
  }

  updateserv(obj){
    this.http.put(`${this.uri}partnerservice/`+obj.id,obj).subscribe(suc => {
      alert("Successfully updated.");

  },
  err => {
     alert("Error in updating.");
  });
  }

  listTests(){
    return this.http.get(`${this.uri}labtest/`);
  }

  addpartnerService(objlist){
      for(let object of objlist){
        this.http.post(`${this.uri}partnerservice/`,object)
        .subscribe(suc => {
          alert("Service Successfully updated.");

      },
      err => {
         alert("Error in adding.");
      });
      }
  }
}
