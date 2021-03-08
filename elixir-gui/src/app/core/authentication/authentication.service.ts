import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  uri = '';
  constructor(private http: HttpClient) { }

  authenticate(obj){
    if(obj.accesstype=="0"){
      alert("Please choose access type")
      return null
    }

    else{
      if(obj.accesstype=="1"){
        this.uri = environment.deployment.labApi+'employee/auth/';
      }

      if(obj.accesstype=="2")
        this.uri = environment.deployment.labApi+'consultant/auth/';

      if(obj.accesstype=="3")
        this.uri = environment.deployment.labApi+'patient/auth/';

        if(obj.accesstype=="4")
        this.uri = environment.deployment.labApi+'employee/auth/';

      return this.http.post(`${this.uri}`,obj)
    }
  }
}
