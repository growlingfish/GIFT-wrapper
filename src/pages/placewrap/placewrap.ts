import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { WorkshopServiceProvider } from '../../providers/workshop-service/workshop-service';

@Component({
  selector: 'page-placewrap',
  templateUrl: 'placewrap.html',
})
export class PlacewrapPage {
  wrapId: number;

  constructor(public nav: NavController, public navParams: NavParams, public viewCtrl: ViewController, private workshop: WorkshopServiceProvider) {
    this.wrapId = navParams.get('wrapId');
  }

  cancelPlace () {
    this.viewCtrl.dismiss();
  }
}
