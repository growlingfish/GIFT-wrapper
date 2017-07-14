import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WorkshopServiceProvider, Wrap, Challenge } from '../../providers/workshop-service/workshop-service';

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
  title: string;
  challenges: Array<Challenge>;
  types: Array<ChallengeType>;

  constructor(public nav: NavController, public navParams: NavParams, private workshop: WorkshopServiceProvider) {
    var typeNames = ['date', 'key', 'artcode', 'place', 'personal', 'object'];
    this.types = [];
    for (var i = 0; i < typeNames.length; i++) {
      this.types.push(new ChallengeType(typeNames[i]));
    }

    this.wrapId = this.navParams.get('wrapId');
    if (typeof(this.wrapId) != 'undefined') {
      this.title = this.workshop.gift.wraps[this.wrapId].title;
      this.challenges = this.workshop.gift.wraps[this.wrapId].challenges;
    }
  }

  addChallenge (type) {
    console.log(type);
  }

  submitWrap () {
    if (typeof(this.wrapId) == 'undefined') {
      var i = 0;
      while (typeof(this.wrapId) == 'undefined') {
        if (typeof(this.workshop.gift.wraps[i]) == 'undefined') {
          this.wrapId = i;
        }
        i++;
      }
      var wrap = new Wrap(this.title);
      wrap.id = this.wrapId;
      wrap.challenges = this.challenges;
      this.workshop.gift.wraps.push(wrap);
    } else {
      this.workshop.gift.wraps[this.wrapId].title = this.title;
      this.workshop.gift.wraps[this.wrapId].challenges = this.challenges;
    }
    this.workshop.storeGift();
    this.nav.pop();
  }

  wrapComplete () {
    return typeof(this.challenges) != 'undefined' && this.challenges.length > 0;
  }
  
  cancelWrap () {
    this.nav.pop();
  }

}
