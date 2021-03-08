import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  uri = environment.deployment.labApi;
  constructor(private http: HttpClient) { }
  add(obj) {
    console.log(obj);
    this.http.post(`${this.uri}appointment/`,obj)
    .subscribe(suc => {
      alert("Successfully added.");
      window.location.reload();
  },
  err => {
     alert("Error in adding.");
  });
  }

  listAll() {
    return this.http.get(`${this.uri}appointment/`);
  }

  remove(id){
    console.log(id);
    this.http.delete(`${this.uri}appointment/`+id)
        .subscribe(suc => {
          alert("Successfully deleted.");
          window.location.reload();
      },
      err => {
         alert("Error in deleting.");
      });

  }

  update(obj){
    this.http.put(`${this.uri}appointment/`+obj.id,obj).subscribe(suc => {
      alert("Successfully updated.");
      window.location.reload();
  },
  err => {
     alert("Error in updating.");
  });
  }

  listSpecialization() {
    return this.http.get(`${this.uri}specialization/`);
  }

  listConsultants() {
    return this.http.get(`${this.uri}consultant/`);
  }

  listPatients() {
    return this.http.get(`${this.uri}patient/`);
  }


}

