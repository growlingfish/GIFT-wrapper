import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { WorkshopServiceProvider, Wrap } from '../../providers/workshop-service/workshop-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { GiftcardPage } from '../../pages/giftcard/giftcard';
import { ObjectwrapPage } from '../objectwrap/objectwrap'; 

@Component({
  selector: 'page-title',
  templateUrl: 'title.html',
})
export class TitlePage {
  titleText: string;

  constructor(public nav: NavController, public navParams: NavParams, private workshop: WorkshopServiceProvider, private auth: AuthServiceProvider, public modalCtrl: ModalController) {
    if (this.workshop.gift.titleComplete()) {
      this.titleText = this.workshop.gift.title;
    }

    /* For Sprint */
    if (!this.objectComplete()) {
      this.workshop.gift.wraps.push(new Wrap(0, this.auth.currentUser.name + "'s wrap started at " + (new Date().toISOString())));
      let objectModal = this.modalCtrl.create(ObjectwrapPage, {
        wrapId: 0
      });
      objectModal.onDidDismiss(data => {
        if (typeof(this.workshop.gift.title) != 'undefined' && this.workshop.gift.title != null) {
          this.titleText = this.workshop.gift.title;
          this.nav.push(GiftcardPage);
        }
      });
      objectModal.present();
    }
  }
 
  cancelTitle () {
    this.nav.pop();
  }

  submitTitle () {
    this.workshop.gift.title = this.titleText;
    this.workshop.storeGift();
    //this.nav.pop();
    this.nav.push(GiftcardPage);
  }

  titleComplete () {
    return typeof(this.titleText) != 'undefined' && this.titleText.length > 0;
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

  getObjectImage () {
    for (var i = 0; i < this.workshop.gift.wraps.length; i++) {
      for (var j = 0; j < this.workshop.gift.wraps[i].challenges.length; j++) {
        if (this.workshop.gift.wraps[i].challenges[j].type == 'object') {
          for (var k = 0; k < this.workshop.objects.length; k++) {
            if (this.workshop.objects[k].id == parseInt(this.workshop.gift.wraps[i].challenges[j].task)) {
              return this.workshop.objects[k].image;
            }
          }
        }
      }
    }
    return './assets/tag.jpg';
  }

}
