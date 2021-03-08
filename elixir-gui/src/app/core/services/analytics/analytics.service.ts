import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  uri = environment.deployment.reportApi;
  constructor(private http: HttpClient) { }

  getDashData(){
    return this.http.get(`${this.uri}dashdata/`);
  }

  getConsultantData(){
    var data = this.http.get(`${this.uri}analytics/consultant`)
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
