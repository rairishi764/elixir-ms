import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  uri = environment.deployment.labApi+'/';
  constructor(private http: HttpClient) { }

  sendSms(obj){
    alert("Sending SMS")
    this.http.post(`${this.uri}/sms`,obj)
    .subscribe(suc => {
      alert("Successfully added.");
      window.location.reload();
  },
  err => {
     alert("Error in sending.");
  });
  }

  sendWaMsg(obj){
    alert("Sending WA Msg")
    this.http.post(`${this.uri}/whatsapp`,obj)
    .subscribe(suc => {
      alert("Successfully added.");
      window.location.reload();
  },
  err => {
     alert("Error in sending.");
  });
  }

  sendWaMsgWithUrl(obj){
    //alert("Sending WA Msg with URL")
    alert(JSON.stringify(obj))
    this.http.post(`${this.uri}/whatsappwithmedia`,obj)
    .subscribe(suc => {
      alert("Successfully added.");
      window.location.reload();
  },
  err => {
     alert("Error in sending.");
  });
  }
}
