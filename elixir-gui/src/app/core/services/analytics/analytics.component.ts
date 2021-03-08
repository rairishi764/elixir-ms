import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './analytics.service';
import {MatTabsModule} from '@angular/material/tabs';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  data : {[k: string]: any} = {};
  consultantData : {[k: string]: any} = {};
  partnerData : {[k: string]: any} = {};
  labInvoiceData : {[k: string]: any} = {};
  consultationInvoiceData : {[k: string]: any} = {};
  patientData : {[k: string]: any} = {};

  constructor(private service: AnalyticsService) { }

  ngOnInit(): void {

    this.service.getLabInvoiceData().subscribe((data: JSON) => {
      this.labInvoiceData = data;
    });
    this.service.getLabPartnerData().subscribe((data: JSON) => {
      this.partnerData = data;
    });

    this.service.getConsultationInvoiceData().subscribe((data: JSON) => {
      this.consultationInvoiceData = data;
    });

    this.service.getPatientData().subscribe((data: JSON) => {
      this.patientData = data;
    });

    this.service.getConsultantData().subscribe((data: JSON) => {
      this.consultantData = data;
    });


  }



}
