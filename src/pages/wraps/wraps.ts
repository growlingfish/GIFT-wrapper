import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WorkshopServiceProvider } from '../../providers/workshop-service/workshop-service';
import { WrapPage } from '../wrap/wrap';

@Component({
  selector: 'page-wraps',
  templateUrl: 'wraps.html',
})
export class WrapsPage {

  constructor(public nav: NavController, public navParams: NavParams, private workshop: WorkshopServiceProvider) {
  }

  editWrap (item) {
    this.nav.push(WrapPage, {
      wrapId: item.id
    });
  }

  addWrap () {
    this.nav.push(WrapPage);
  }

  backToGift () {
    this.nav.pop();
  }

}
