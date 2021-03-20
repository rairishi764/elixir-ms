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
    //alert(this.authService.user.role)
    if(this.authService.user.uid!=''&&(this.authService.user.role==1||this.authService.user.role==2||this.authService.user.role==3))
    {
    //return this.router.url === '/';
    return true
  }
  else
    return false
  }
}
