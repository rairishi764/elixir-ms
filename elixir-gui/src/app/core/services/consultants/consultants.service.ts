import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultantsService {
  uri = environment.deployment.labApi;
  constructor(private http: HttpClient) { }
  add(obj) {
    console.log(obj);
    alert(JSON.stringify(obj))
    this.http.post(`${this.uri}consultant/`,obj)
    .subscribe(suc => {
      alert("Successfully added.");

  },
  err => {
     alert("Error in adding.");
  });
  }

  listAll() {
    return this.http.get(`${this.uri}consultant/`);
  }

  remove(id){
    console.log(id);
    this.http.delete(`${this.uri}consultant/`+id)
        .subscribe(suc => {
          alert("Successfully deleted.");

      },
      err => {
         alert("Error in deleting.");
      });

  }

  update(obj){
    this.http.put(`${this.uri}consultant/`+obj.id,obj).subscribe(suc => {
      alert("Successfully updated.");

  },
  err => {
     alert("Error in updating.");
  });
  }

  listCategories() {
    return this.http.get(`${this.uri}specialization/`);
  }


}

