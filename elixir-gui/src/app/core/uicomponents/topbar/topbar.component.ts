import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.SignOut()
  }

  sidebartoggle(){
    $('#sidebar').toggleClass('active');
  }

}
