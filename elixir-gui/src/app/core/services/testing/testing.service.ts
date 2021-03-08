import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class TestingService {
  http: HttpClient;
  uri: "http://localhost:3002/api/";
  constructor() { }


  listAll(){
    return this.http.get(`${this.uri}`+"partner");

  }

  listAllTests(){
    return this.http.get(`${this.uri}`+"labtest");
  }
}
