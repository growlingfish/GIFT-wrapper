import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { WorkshopServiceProvider } from '../../providers/workshop-service/workshop-service';
import { User } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-workshop',
  templateUrl: 'workshop.html',
})
export class WorkshopPage {
  currentUser: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, private workshop: WorkshopServiceProvider) {
    this.currentUser = auth.getUserInfo();
  }
}
