import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { WorkshopServiceProvider } from '../../providers/workshop-service/workshop-service';

@Component({
  selector: 'page-personalwrap',
  templateUrl: 'personalwrap.html',
})
export class PersonalwrapPage {
  personal: string = null;
  wrapId: number;

  constructor(public nav: NavController, public navParams: NavParams, public viewCtrl: ViewController, private workshop: WorkshopServiceProvider) {
    this.wrapId = navParams.get('wrapId');
    for (var i = 0; i < this.workshop.gift.getWrapWithID(this.wrapId).challenges.length; i++) {
      if (this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].type == 'personal') {
        this.personal = this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].task;
        break;
      }
    }
  }

  cancelPersonal () {
    this.viewCtrl.dismiss();
  }

  submitPersonal () {
    this.workshop.gift.getWrapWithID(this.wrapId).setChallenge('personal', this.personal); 
    this.workshop.storeGift();
    this.viewCtrl.dismiss();
  }

  personalAdded () {
    for (var i = 0; i < this.workshop.gift.getWrapWithID(this.wrapId).challenges.length; i++) {
      if (this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].type == 'personal') {
        return true;
      }
    }
    return false;
  }

  scrapPersonal () {
    for (var i = 0; i < this.workshop.gift.getWrapWithID(this.wrapId).challenges.length; i++) {
      if (this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].type == 'personal') {
        this.workshop.gift.getWrapWithID(this.wrapId).challenges.splice(i, 1);
      }
    }
    this.cancelPersonal();
  }

}
