import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    firebase.initializeApp(firebaseConfig)
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

var firebaseConfig={
  apiKey: "AIzaSyDlflq5k9qhoyuwCSfYnX8ieZbPrmnS7zE",
    authDomain: "login-aaaeo.firebaseapp.com",
    databaseURL: "https://login-aaaeo.firebaseio.com",
    projectId: "login-aaaeo",
    storageBucket: "login-aaaeo.appspot.com",
    messagingSenderId: "749172085875",
    appId: "1:749172085875:web:1692a8bd4d33e0c63ac606",
    measurementId: "G-DDT75R7VC0"
};