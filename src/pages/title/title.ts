import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WorkshopServiceProvider } from '../../providers/workshop-service/workshop-service';

@Component({
  selector: 'page-title',
  templateUrl: 'title.html',
})
export class TitlePage {
  titleText: string;

  constructor(public nav: NavController, public navParams: NavParams, private workshop: WorkshopServiceProvider) {
    if (this.workshop.gift.titleComplete()) {
      this.titleText = this.workshop.gift.title;
    }
  }

  cancelTitle () {
    this.nav.pop();
  }

  submitTitle () {
    this.workshop.gift.title = this.titleText;
    this.workshop.storeGift();
    this.nav.pop();
  }

  titleComplete () {
    return typeof(this.titleText) != 'undefined' && this.titleText.length > 0;
  }

}
