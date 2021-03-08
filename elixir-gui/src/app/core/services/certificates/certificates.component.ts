import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {
  public client = environment.clientdetails.fullname;
  public location = '';
  constructor(public router : Router) {
    this.location = router.url;
  }


  ngOnInit(): void {
    this.location = this.router.url;
  }

  print(){
    window.print()
    //this.sendmail()
 }

}
