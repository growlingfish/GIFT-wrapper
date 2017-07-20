import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { WorkshopServiceProvider } from '../../providers/workshop-service/workshop-service';
import { GlobalVarProvider } from '../../providers/global-var/global-var';
import { User } from '../../providers/auth-service/auth-service';
import { WorkshopPage } from '../workshop/workshop';
import { ReceiverPage } from '../receiver/receiver';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currentUser: User;

  constructor(private nav: NavController, private auth: AuthServiceProvider, private globalVar: GlobalVarProvider, private workshop: WorkshopServiceProvider) {
    this.currentUser = auth.getUserInfo();
  }

  chooseFamiliar () {
    if (typeof(this.workshop) == 'undefined' || this.workshop.gift == null) {
      this.workshop.startGift();
    }
    this.globalVar.stranger = false;
    this.nav.push(ReceiverPage);
  }

  chooseStranger () {
    if (typeof(this.workshop) == 'undefined' || this.workshop.gift == null) {
      this.workshop.startGift();
    }
    this.globalVar.stranger = true;
    this.nav.push(ProfilePage);
  }

  openWorkshop () {
    this.nav.push(WorkshopPage);
  }
}
