import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultationinvoiceService {
  uri = environment.deployment.labApi;

  constructor(private http: HttpClient) { }
  listAll() {
    return this.http.get(`${this.uri}consultationinvoice/`);
  }

  remove(id){
    this.http.delete(`${this.uri}consultationinvoice/`+id)
        .subscribe(suc => {
          alert("Successfully deleted.");
          window.location.reload();
      },
      err => {
         alert("Error in deleting.");
      });
  }

  update(obj){
    //alert(JSON.stringify(obj));
    this.http.put(`${this.uri}consultationinvoice/`+obj.id,obj).subscribe(suc => {
      alert("Successfully updated.");
      window.location.reload();
  },
  err => {
     alert("Error in updating.");
  });
  }

  listAllPatients(){
    return this.http.get(`${this.uri}`+"patient/");
  }

  getInvoiceById(id) {
    return this.http.get(`${this.uri}consultationinvoice/`+id);
  }

  getConsultationService() {
    return this.http.get(`${this.uri}consultantationservice/`);
  }
  getPartnerShareType() {
    return this.http.get(`${this.uri}partnershare/`);
  }
  getDiscountType() {
    return this.http.get(`${this.uri}discounttype/`);
  }
  getSubCategory() {
    return this.http.get(`${this.uri}labsubcategory/`);
  }
  getTest() {
    return this.http.get(`${this.uri}labtest/`);
  }
  getPatients() {
    return this.http.get(`${this.uri}patient/`);
  }
  getConsultants() {
    return this.http.get(`${this.uri}consultant/`);
  }

  getConsultantServiceMap() {
    return this.http.get(`${this.uri}consultantservice/`);
  }

  add(obj) {
      return this.http.post(`${this.uri}consultationinvoice/`, obj);
      }

  getPartnerService(){
    return this.http.get(`${this.uri}partnerservice/`);
  }

  sendmail(obj){
    //alert(JSON.stringify(obj));
    return this.http.post(environment.deployment.mailApi+`/sendmail/`, obj).subscribe(suc => {
  });
  }

}
