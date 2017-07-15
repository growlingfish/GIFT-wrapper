import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { WorkshopServiceProvider, Wrap, Challenge } from '../../providers/workshop-service/workshop-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ObjectwrapPage } from '../objectwrap/objectwrap';

class ChallengeType {
  name: string;

  constructor (name: string) {
    this.name = name;
  }

  getHint () {
    switch (this.name) {
      case 'date':
        return 'Wait for a certain date';
      case 'key':
        return 'Enter a keycode';
      case 'artcode':
        return 'Scan an Artcode';
      case 'place':
        return 'Travel to a location';
      case 'personal':
        return 'A personal request';
      case 'object':
        return 'Find an exhibit';
    }
  }

  getIcon () {
    switch (this.name) {
      case 'date':
        return 'alarm';
      case 'key':
        return 'key';
      case 'artcode':
        return 'image';
      case 'place':
        return 'compass';
      case 'personal':
        return 'heart';
      case 'object':
        return 'cube';
    }
  }
}

@Component({
  selector: 'page-wrap',
  templateUrl: 'wrap.html',
})
export class WrapPage {
  wrapId: number;
  types: Array<ChallengeType>;

  constructor(public nav: NavController, public navParams: NavParams, private workshop: WorkshopServiceProvider, public modalCtrl: ModalController, private auth: AuthServiceProvider) {
    var typeNames = ['date', 'place', 'object', 'key', 'personal', 'artcode'];
    this.types = [];
    for (var i = 0; i < typeNames.length; i++) {
      this.types.push(new ChallengeType(typeNames[i]));
    }

    this.wrapId = this.navParams.get('wrapId');
    if (typeof(this.wrapId) == 'undefined') {
      var i = 0;
      while (typeof(this.wrapId) == 'undefined') {
        if (typeof(this.workshop.gift.wraps[i]) == 'undefined') {
          this.wrapId = i;
        }
        i++;
      }
      this.workshop.gift.wraps.push(new Wrap(this.wrapId, this.auth.currentUser.name + "'s wrap started at " + (new Date().toISOString())));
    }
  }

  typeAdded (type) {
    if (typeof(this.workshop.gift.getWrapWithID(this.wrapId)) != 'undefined') {
      for (var i = 0; i < this.workshop.gift.getWrapWithID(this.wrapId).challenges.length; i++) {
        if (this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].type == type) {
          return true;
        }
      }
    }
    return false;
  }

  addChallenge (type) {
    switch (type) {
      case 'date':
        console.log(type);
        break;
      case 'key':
        console.log(type);
        break;
      case 'artcode':
        console.log(type);
        break;
      case 'place':
        console.log(type);
        break;
      case 'personal':
        console.log(type);
        break;
      case 'object':
        let objectModal = this.modalCtrl.create(ObjectwrapPage, {
          wrapId: this.wrapId
        });
        objectModal.present();
        break;
      default:
        break;
    }
  }

  submitWrap () {
    this.workshop.storeGift();
    this.nav.pop();
  }

  wrapComplete () {
    return typeof(this.workshop.gift.getWrapWithID(this.wrapId)) != 'undefined'
      && typeof(this.workshop.gift.getWrapWithID(this.wrapId).challenges) != 'undefined'
      && this.workshop.gift.getWrapWithID(this.wrapId).challenges.length > 0;
  }
  
  cancelWrap () {
    for (var i = 0; i < this.workshop.gift.wraps.length; i++) {
      if (this.workshop.gift.wraps[i].id == this.wrapId) {
        this.workshop.gift.wraps.splice(i, 1);
      }
    }
    this.nav.pop();
  }

  pauseWrap () {
    if (typeof(this.workshop.gift.getWrapWithID(this.wrapId)) != 'undefined' && !this.wrapComplete()) {
      for (var i = 0; i < this.workshop.gift.wraps.length; i++) {
        if (this.workshop.gift.wraps[i].id == this.wrapId) {
          this.workshop.gift.wraps.splice(i, 1);
        }
      }
    }
    this.nav.pop();
  }

  ionViewDidLeave () {
    if (typeof(this.workshop.gift.getWrapWithID(this.wrapId)) != 'undefined' && !this.wrapComplete()) {
      for (var i = 0; i < this.workshop.gift.wraps.length; i++) {
        if (this.workshop.gift.wraps[i].id == this.wrapId) {
          this.workshop.gift.wraps.splice(i, 1);
        }
      }
    }
  }

}
