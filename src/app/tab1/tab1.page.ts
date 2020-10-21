import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuxiliarService } from '../services/auxiliar.service';
import { Coords } from '../models/coords';
import * as firebase from 'firebase';
import { element } from 'protractor';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  origin = new Coords()
  destination = new Coords()
  uid =""
  lugares= []

  constructor(
    private geoController: Geolocation, 
    private alertController: AlertController, 
    private aux: AuxiliarService, 
    private navController: NavController) {
  }

  getLocation(){
    this.geoController.getCurrentPosition().then(position => {
      this.origin.lat = position.coords.latitude;
      this.origin.lng = position.coords.longitude;
    }).catch( err =>{
    })
  }

  getPlaces(){
    firebase.database().ref("Lugares").once("value").then((snapshot)=> {
      if (snapshot.val()!=null){
        snapshot.forEach(element=>{
          this.lugares.push(element.val())
        })
      }
    })
    }

  async show_info(lugar: Coords){
    const alert = await this.alertController.create({
      header: lugar.nombre,
      subHeader: "Horario: " + lugar.time,
      buttons: [{
        text: "Como Llegar",
        handler: ()=>{
          this.send(lugar)
        }
      }]
    })
    await alert.present()
  }

  send(lugar){
    this.destination.lat = lugar.lat;
    this.destination.lng = lugar.lng;
    let indications = {
      origin: this.origin,
      destination: this.destination
    }
    console.table(indications)
    this.aux.setParams("indicaciones",indications)
    this.navController.navigateForward("tabs/tab2")
  }

  ionViewDidEnter(){
    this.getLocation()
    this.getPlaces();
  }


}
