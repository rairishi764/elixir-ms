import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { MessagesService } from './messages.service';
import {environment} from '../../../../environments/environment'
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private service: MessagesService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      phone: ['', Validators.required],
      carrier:[],
      mediaurl: [''],
      message: ['', Validators.required],

  });
  }
  get f() { return this.registerForm.controls; }
    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
          alert("invalid")
            return;
        }

        if(this.registerForm.value.phone == 'patients'){

        }
        if(this.registerForm.value.phone == 'consultants'){

        }
        this.registerForm.value.body=this.registerForm.value.message
        this.registerForm.value.to = this.registerForm.value.phone;
        if(this.registerForm.value.carrier=='sms'){
            this.registerForm.value.from_ = environment.clientdetails.sms_phone
            this.service.sendSms(this.registerForm.value);
            //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
          }
        if(this.registerForm.value.carrier=='whatsapp'){
            this.registerForm.value.from_ = environment.clientdetails.whatsapp_phone
            this.service.sendWaMsg(this.registerForm.value);
            //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
          }
        if(this.registerForm.value.carrier=='whatsapp'&&(this.registerForm.value.mediaurl!=''||this.registerForm.value.mediaurl!=null)){
            this.registerForm.value.from_ = environment.clientdetails.whatsapp_phone
            this.service.sendWaMsgWithUrl(this.registerForm.value);
          }
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }

}
