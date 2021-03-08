import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from './core/shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

//  sessionStorage.setItem("user","");
  session:string = sessionStorage.getItem("user");
  title = 'elixir-gui';
  constructor(public router : Router,public authService: AuthService){}
  isHomeRoute() {
    if(this.authService.user.uid!='')
    return this.router.url === '/';
  }
}
