import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  uri = environment.deployment.labApi+'patient/';
  constructor(private http: HttpClient) { }

  add(obj) {
    this.http.post(`${this.uri}`,obj)
    .subscribe(suc => {
      alert("Successfully added.");
      window.location.reload();
  },
  err => {
     alert("Error in adding.");
  });
  }

  listAll() {
    return this.http.get(`${this.uri}`);
  }

  remove(id){
    this.http.delete(`${this.uri}`+id)
        .subscribe(suc => {
          alert("Successfully deleted.");
          window.location.reload();
      },
      err => {
         alert("Error in deleting.");
      });
  }

  update(obj){
    this.http.put(`${this.uri}`+obj.id,obj).subscribe(suc => {
      alert("Successfully updated.");
      window.location.reload();
  },
  err => {
     alert("Error in updating.");
  });
  }

}
