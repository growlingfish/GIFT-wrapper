import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WorkshopServiceProvider } from '../../providers/workshop-service/workshop-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Giftcard } from '../../providers/workshop-service/workshop-service';

@Component({
  selector: 'page-giftcard',
  templateUrl: 'giftcard.html',
})
export class GiftcardPage {
  giftcardText: string;

  constructor(public nav: NavController, public navParams: NavParams, private workshop: WorkshopServiceProvider, private auth: AuthServiceProvider) {
    if (this.workshop.gift.giftcardComplete()) {
      this.giftcardText = this.workshop.gift.giftcard.content;
    }
  }

  cancelGiftcard () {
    this.nav.pop();
  }

  submitGiftcard () {
    var title = null;
    if (this.workshop.gift.titleComplete()) {
      title = this.auth.currentUser.name + "'s giftcard for " + this.workshop.gift.title;
    } else {
      title = this.auth.currentUser.name + "'s giftcard edited at " + (new Date().toISOString());
    }
    this.workshop.gift.giftcard = new Giftcard(title, this.giftcardText);
    this.workshop.storeGift();
    this.nav.pop();
  }

  giftcardTextComplete () {
    return typeof(this.giftcardText) != 'undefined' && this.giftcardText.length > 0;
  }

}
