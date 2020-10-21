import { Component } from '@angular/core';
import { AuxiliarService } from '../services/auxiliar.service';
import { Coords } from '../models/coords';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  origin = new Coords()
  destination = new Coords()
  show = false;
  constructor(private aux: AuxiliarService) {}

  ionViewDidEnter(){
    let indications = this.aux.getParams("indicaciones")
    if (indications){
      this.show = true
      this.origin = indications.origin
      this.destination = indications.destination
      console.table(indications)
    }
 
  }

  ionViewWillLeave(){
    this.origin = new Coords()
    this.destination = new Coords()
    console.log("adios")
  }
}
