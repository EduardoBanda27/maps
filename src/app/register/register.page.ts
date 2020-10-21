import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = new User();

  constructor(private authSvc: AuthService, private navc: NavController) { }

  ngOnInit() {}

  onRegister(){
    this.authSvc.signup(this.user.email, this.user.password, this.user.nombre).then(res =>{
      this.navc.navigateForward('tabs')
    })
  }

}
