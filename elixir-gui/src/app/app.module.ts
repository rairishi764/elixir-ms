import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
//Lab components
import { PatientsComponent } from './core/services/patients/patients.component';
import { ConsultantsComponent } from './core/services/consultants/consultants.component';
import { CategoriesComponent } from './core/services/lab/categories/categories.component';
import { SubCategoriesComponent } from './core/services/lab/subcategories/subcategories.component';
import { TestsComponent } from './core/services/lab/tests/tests.component';
//for reactive forms with validation
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConsultantsService } from './core/services/consultants/consultants.service';
import { AuthenticationComponent } from './core/authentication/authentication.component';
import { DataTablesModule } from 'angular-datatables';
import { PartnersComponent } from './core/services/lab/partners/partners.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { LabinvoiceComponent } from './core/services/lab/labinvoice/labinvoice.component';
import {MatButtonModule} from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppointmentComponent } from './core/services/appointment/appointment.component';
import { UicomponentsModule } from './core/uicomponents/uicomponents.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeComponent } from './core/services/employee/employee.component';
import {NgxPrintModule} from 'ngx-print';
import { TestingComponent } from './core/services/testing/testing.component';
import { SpecializationComponent } from './core/services/specialization/specialization.component';
import { ConsultationservicesComponent } from './core/services/consultationservices/consultationservices.component';
import { AuthGoogleComponent } from './core/auth-google/auth-google.component';
import { environment } from './../environments/environment';
import { ConsultationinvoiceComponent } from './core/services/consultationinvoice/consultationinvoice.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { AnalyticsComponent } from './core/services/analytics/analytics.component';
import {MatTabsModule} from '@angular/material/tabs';

import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
import { MessagesComponent } from './core/services/messages/messages.component';
import { CertificatesComponent } from './core/services/certificates/certificates.component';
// ...omitted
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LogInComponent } from './core/shared/auth/log-in/log-in.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

const config = {
  apiKey: "AIzaSyCMiS8O_uXK6GHiVpHwc97nlFx4v89E640",
  authDomain: "elixir-ba0ec.firebaseapp.com",
  databaseURL: "https://elixir-ba0ec.firebaseio.com",
  projectId: "elixir-ba0ec",
  storageBucket: "elixir-ba0ec.appspot.com",
  messagingSenderId: "927290938054",
  appId: "1:927290938054:web:b0ee967d7be9ca2ba8bdc7",
  measurementId: "G-1M1K6Q7JL6"}

providers: [ ConsultantsService ]

@NgModule({
  exports: [  ],
  declarations: [
    AppComponent,
    PatientsComponent,
    ConsultantsComponent,
    CategoriesComponent,
    SubCategoriesComponent,
    TestsComponent,
    AuthenticationComponent,
    PartnersComponent,
    DashboardComponent,
    LabinvoiceComponent,
    AppointmentComponent,
    EmployeeComponent,
    TestingComponent,
    SpecializationComponent,
    ConsultationservicesComponent,
    AuthGoogleComponent,
    ConsultationinvoiceComponent,
    AnalyticsComponent,
    MessagesComponent,
    CertificatesComponent,
    LogInComponent,

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    SocialLoginModule,
    AppRoutingModule,
    ReactiveFormsModule, //for validation
    HttpClientModule,
    DataTablesModule,
    UicomponentsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    NgxPrintModule,
    MatSlideToggleModule,
    MatTabsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot()
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              'clientId'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId'),
          },
          {
            id: AmazonLoginProvider.PROVIDER_ID,
            provider: new AmazonLoginProvider(
              'clientId'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
