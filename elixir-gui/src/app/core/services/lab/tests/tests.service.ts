import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TestsService {

  uri = environment.deployment.labApi;
  constructor(private http: HttpClient) { }

  add(obj) {
    this.http.post(`${this.uri}`+"labtest",obj)
    .subscribe(suc => {
      alert("Successfully added.");
      window.location.reload();
  },
  err => {
     alert("Error in adding.");
  });
  }

  listAll() {
    return this.http.get(`${this.uri}`+"labtest");
  }

  remove(id){
    this.http.delete(`${this.uri}`+"labtest/"+id)
        .subscribe(suc => {
          alert("Successfully deleted.");
          window.location.reload();
      },
      err => {
         alert("Error in deleting.");
      });
  }

  update(obj){
    this.http.put(`${this.uri}`+"labtest/"+obj.id,obj).subscribe(suc => {
      alert("Successfully updated.");
      window.location.reload();
  },
  err => {
     alert("Error in updating.");
  });
  }

  getCategory() {
    //alert(this.http.get(`${this.categoryuri}`));
    return this.http.get(`${this.uri}`+"labcategory/");
  }

  getPartner(){
    return this.http.get(`${this.uri}`+"partner/");
  }
  getPartnerShareType() {
    return this.http.get(`${this.uri}`+"partnershare/");
  }
  getDiscountType(){
    return this.http.get(`${this.uri}`+"discounttype/");
  }

  getSubCategory(){
    return this.http.get(`${this.uri}`+"labsubcategory/");
  }

}
