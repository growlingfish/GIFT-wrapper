import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { WorkshopServiceProvider } from '../../providers/workshop-service/workshop-service';

@Component({
  selector: 'page-artcodewrap', 
  templateUrl: 'artcodewrap.html',
})
export class ArtcodewrapPage {
  artcode: string = "1:1:1:1";
  wrapId: number;

  constructor(public nav: NavController, public navParams: NavParams, public viewCtrl: ViewController, private workshop: WorkshopServiceProvider) {
    this.wrapId = navParams.get('wrapId');
    for (var i = 0; i < this.workshop.gift.getWrapWithID(this.wrapId).challenges.length; i++) {
      if (this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].type == 'artcode') {
        this.artcode = this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].task;
        break;
      }
    }
  }

  cancelArtcode () {
    this.viewCtrl.dismiss();
  }

  submitArtcode () {
    this.workshop.gift.getWrapWithID(this.wrapId).setChallenge('artcode', this.artcode); 
    this.workshop.storeGift();
    this.viewCtrl.dismiss();
  }

  artcodeAdded () {
    for (var i = 0; i < this.workshop.gift.getWrapWithID(this.wrapId).challenges.length; i++) {
      if (this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].type == 'artcode') {
        return true;
      }
    }
    return false;
  }

  scrapArtcode () {
    for (var i = 0; i < this.workshop.gift.getWrapWithID(this.wrapId).challenges.length; i++) {
      if (this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].type == 'artcode') {
        this.workshop.gift.getWrapWithID(this.wrapId).challenges.splice(i, 1);
      }
    }
    this.cancelArtcode();
  }
}
