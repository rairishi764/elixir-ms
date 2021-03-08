import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsComponent } from './core/services/patients/patients.component';
import { ConsultantsComponent } from './core/services/consultants/consultants.component';
import { CategoriesComponent } from 'src/app/core/services/lab/categories/categories.component';
import { SubCategoriesComponent } from 'src/app/core/services/lab/subcategories/subcategories.component';
import { PartnersComponent } from 'src/app/core/services/lab/partners/partners.component';
import { TestsComponent } from 'src/app/core/services/lab/tests/tests.component';
import { LabinvoiceComponent } from 'src/app/core/services/lab/labinvoice/labinvoice.component';
import { EmployeeComponent } from 'src/app/core/services/employee/employee.component';
import {TestingComponent} from 'src/app/core/services/testing/testing.component';
import {SpecializationComponent} from 'src/app/core/services/specialization/specialization.component'
import { AppointmentComponent } from './core/services/appointment/appointment.component';
import { ConsultationservicesComponent } from './core/services/consultationservices/consultationservices.component';
import { ConsultationinvoiceComponent } from './core/services/consultationinvoice/consultationinvoice.component'
import { AnalyticsComponent } from './core/services/analytics/analytics.component';
import { MessagesComponent } from './core/services/messages/messages.component';
import { CertificatesComponent } from './core/services/certificates/certificates.component'
const routes: Routes = [
  {
    path: 'patient/add',
    component: PatientsComponent
},
{
  path: 'patient/view',
  component: PatientsComponent
},
  {
    path: 'consultant/add',
    component: ConsultantsComponent
  },
  {
    path: 'consultant/view',
    component: ConsultantsComponent
  },
  {
    path: 'consultant/update',
    component: ConsultantsComponent
  },
  {
    path: 'categories/view',
    component: CategoriesComponent
  },
  {
    path: 'subcategories/view',
    component: SubCategoriesComponent
  },
  {
    path: 'partners/view',
    component: PartnersComponent
  },
  {
    path: 'partners/partnerservice/add',
    component: PartnersComponent
  },
  {
    path: 'tests/view',
    component: TestsComponent
  },
  {
    path: 'labinvoice/view',
    component: LabinvoiceComponent
  },
  {
    path: 'labinvoice/add',
    component: LabinvoiceComponent
  },
  {
    path: 'labinvoice/print',
    component: LabinvoiceComponent
  },
  {
    path: 'employee/add',
    component: EmployeeComponent
  },
  {
    path: 'employee/view',
    component: EmployeeComponent
  },
  {
    path: 'elixir/testing',
    component: TestingComponent
  },
  {
    path: 'partners/partnerservice/list',
    component: PartnersComponent
  },

  {
    path: 'specialization/view',
    component: SpecializationComponent
  },
  {
    path: 'appointment/add',
    component: AppointmentComponent
  },
  {
    path: 'appointment/view',
    component: AppointmentComponent
  },
  {
    path: 'appointment/calendar',
    component: AppointmentComponent
  },
  {
    path: 'consultationservices/view',
    component: ConsultationservicesComponent
  },
  {
    path: 'consultationservices/add',
    component: ConsultationservicesComponent
  },
  {
    path : 'consultationservices/map',
    component: ConsultationservicesComponent
  },
  {
    path : 'consultationservices/list',
    component: ConsultationservicesComponent
  },
  {
    path : 'consultationinvoice/add',
    component: ConsultationinvoiceComponent
  },
  {
    path : 'consultinvoice/print',
    component: ConsultationinvoiceComponent
  },
  {
    path : 'consultationinvoice/view',
    component: ConsultationinvoiceComponent
  },
  {
    path : 'analytics/consultant',
    component: AnalyticsComponent
  },
  {
    path : 'analytics/center',
    component: AnalyticsComponent
  },
  {
    path : 'communication/message',
    component: MessagesComponent
  },
  {
    path : 'certificates/medical',
    component: CertificatesComponent
  },
  {
    path : 'certificates/experience',
    component: CertificatesComponent
  },
  {
    path : 'certificates/letterhead',
    component: CertificatesComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
