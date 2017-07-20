import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { WorkshopServiceProvider, Wrap } from '../../providers/workshop-service/workshop-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { GlobalVarProvider } from '../../providers/global-var/global-var';
import { Giftcard } from '../../providers/workshop-service/workshop-service';
import { PayloadPage } from '../payload/payload'; 
import { ObjectwrapPage } from '../objectwrap/objectwrap'; 

@Component({
  selector: 'page-giftcard',
  templateUrl: 'giftcard.html',
})
export class GiftcardPage {
  giftcardText: string;

  constructor(public nav: NavController, public navParams: NavParams, private workshop: WorkshopServiceProvider, private auth: AuthServiceProvider, private globalVar: GlobalVarProvider, public modalCtrl: ModalController) {
    /* For Sprint */
    if (!this.objectComplete()) {
      this.workshop.gift.wraps.push(new Wrap(0, this.auth.currentUser.name + "'s wrap started at " + (new Date().toISOString())));
      let objectModal = this.modalCtrl.create(ObjectwrapPage, {
        wrapId: 0
      });
      objectModal.present();
    }
    
    if (this.workshop.gift.giftcardComplete()) {
      this.giftcardText = this.workshop.gift.giftcard.content;
    } else {
      if (this.globalVar.stranger) {
        this.giftcardText = "Hey stranger - I wanted to give you ...";
      } else {
        this.giftcardText = "Hey " + this.workshop.gift.receiverName + " - I wanted to give you ...";
      }
    }
  }

  objectComplete () {
    for (var i = 0; i < this.workshop.gift.wraps.length; i++) {
      for (var j = 0; j < this.workshop.gift.wraps[i].challenges.length; j++) {
        if (this.workshop.gift.wraps[i].challenges[j].type == 'object') {
          return true;
        }
      }
    }
    return false;
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
    //this.nav.pop();

    // For Sprint
    if (this.workshop.gift.payloads.length > 0) {
      this.nav.push(PayloadPage, {
        payloadId: this.workshop.gift.payloads[0].id
      });
    } else {
      this.nav.push(PayloadPage);
    }
  }

  giftcardTextComplete () {
    return typeof(this.giftcardText) != 'undefined' && this.giftcardText.length > 0;
  }

}
