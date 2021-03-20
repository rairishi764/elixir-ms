import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
// copy above as is

export class SubCategoriesService {
  uri = environment.deployment.labApi+'labsubcategory/';
  categoriesuri = environment.deployment.labApi+'labcategory/';

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
    this.http.put(`${this.uri}`+obj.id,obj).subscribe(suc => {
      alert("Successfully updated.");

  },
  err => {
     alert("Error in updating.");
  });

  }


  listCategories() {
    //alert(this.categoriesuri);
    var data =this.http.get(`${this.categoriesuri}`);
    //alert(data);
    return this.http.get(`${this.categoriesuri}`);
  }

}
