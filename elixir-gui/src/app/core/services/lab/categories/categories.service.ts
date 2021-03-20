import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
// copy above as is

export class CategoriesService {
  uri = environment.deployment.labApi+'labcategory/';
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

  listAll() {
    return this.http.get(`${this.uri}`);
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

  update(obj){
    this.http.put(`${this.uri}`+obj.lab_category_id,obj).subscribe(suc => {
      alert("Successfully updated.");

  },
  err => {
     alert("Error in updating.");
  });
  }

}
