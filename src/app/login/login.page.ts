import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = new User();

  constructor(private authSvc: AuthService, private navc: NavController) { }

  ngOnInit() {}

  onLogin(){
    this.authSvc.login(this.user.email, this.user.password).then(res =>{
      this.navc.navigateForward('tabs')
    })
  }

  logout(){
    this.authSvc.signout()
  }

}
