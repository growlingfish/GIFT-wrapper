import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { WorkshopServiceProvider } from '../../providers/workshop-service/workshop-service';
import { User } from '../../providers/auth-service/auth-service';
import { TitlePage } from '../title/title';
import { ReceiverPage } from '../receiver/receiver';

@Component({
  selector: 'page-workshop',
  templateUrl: 'workshop.html',
})
export class WorkshopPage {
  currentUser: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, private workshop: WorkshopServiceProvider) {
    this.currentUser = auth.getUserInfo();
  }

  scrapGift () {
    this.workshop.scrapGift();
    this.navCtrl.popToRoot();
  }

  editTitle () {
    this.navCtrl.push(TitlePage);
  }

  editReceiver () {
    this.navCtrl.push(ReceiverPage);
  }

  editPayloads () {
    console.log("Edit");
  }

  editWraps () {
    console.log("Edit");
  }
}
