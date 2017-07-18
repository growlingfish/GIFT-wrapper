import { Component } from '@angular/core';
import { NavController, NavParams, ViewController  } from 'ionic-angular';
import { WorkshopServiceProvider } from '../../providers/workshop-service/workshop-service';

@Component({
  selector: 'page-keywrap',
  templateUrl: 'keywrap.html',
})
export class KeywrapPage {
  keycode: string = null;
  wrapId: number;

  constructor(public nav: NavController, public navParams: NavParams, public viewCtrl: ViewController, private workshop: WorkshopServiceProvider) {
    this.wrapId = navParams.get('wrapId');
    for (var i = 0; i < this.workshop.gift.getWrapWithID(this.wrapId).challenges.length; i++) {
      if (this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].type == 'key') {
        this.keycode = this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].task;
        break;
      }
    }
  }

  cancelKeycode () {
    this.viewCtrl.dismiss();
  }

  submitKeycode () {
    this.workshop.gift.getWrapWithID(this.wrapId).setChallenge('key', this.keycode); 
    this.workshop.storeGift();
    this.viewCtrl.dismiss();
  }

  keycodeAdded () {
    for (var i = 0; i < this.workshop.gift.getWrapWithID(this.wrapId).challenges.length; i++) {
      if (this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].type == 'key') {
        return true;
      }
    }
    return false;
  }

  scrapKeycode () {
    for (var i = 0; i < this.workshop.gift.getWrapWithID(this.wrapId).challenges.length; i++) {
      if (this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].type == 'key') {
        this.workshop.gift.getWrapWithID(this.wrapId).challenges.splice(i, 1);
      }
    }
    this.cancelKeycode();
  }

}
