import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  uri = environment.deployment.reportApi;
  constructor(private http: HttpClient) { }

  getDashData(){
    return this.http.get(`${this.uri}dashdata/`);
  }

  getConsultantData(){
    return this.http.get(`${this.uri}analytics/consultant`);
  }

  getLabPartnerData(){
    return this.http.get(`${this.uri}analytics/labpartner`);
  }

  getLabInvoiceData(){
    return this.http.get(`${this.uri}analytics/labinvoice`);
  }

  getConsultationInvoiceData(){
    return this.http.get(`${this.uri}analytics/consultationinvoice`);
  }

  getPatientData(){
    return this.http.get(`${this.uri}analytics/patients`);
  }
}



