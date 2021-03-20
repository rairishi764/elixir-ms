import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ConsultationservicesService {

  uri = environment.deployment.labApi+'consultantationservice/';
  constructor(private http: HttpClient) { }

  add(obj) {
    this.http.post(`${this.uri}`,obj)
    .subscribe(suc => {
      alert("Successfully added.");

  },
  err => {
     alert("Error in adding.");
  });
  }

   addService(obj) : any {
    this.http.post(environment.deployment.labApi+'consultantservice',obj)
    .subscribe(suc => {
      return 0
  },
  err => {
     return 1
  });
  }

  listAll() {
    return this.http.get(`${this.uri}`);
  }

  listAllConsultants() {
    return this.http.get(environment.deployment.labApi+'consultant/');
  }

  remove(id){
    this.http.delete(`${this.uri}`+id)
        .subscribe(suc => {
          alert("Successfully deleted.");

      },
      err => {
         alert("Error in deleting.");
      });
  }


  removeServiceMap(id){
    this.http.delete(environment.deployment.labApi+'consultantservice/'+id)
        .subscribe(suc => {
          alert("Successfully deleted.");

      },
      err => {
         alert("Error in deleting.");
      });
  }

  update(obj){
    this.http.put(`${this.uri}`+obj.id,obj).subscribe(suc => {
      alert("Successfully updated.");

  },
  err => {
     alert("Error in updating.");
  });
  }

  listAllConsultantServices(){
    return this.http.get(environment.deployment.labApi+'consultantservice/');
  }

  listAllConsultantServicesMap(){
    return this.http.get(environment.deployment.labApi+'consultantservice/');
  }
}
