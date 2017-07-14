import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WorkshopServiceProvider } from '../../providers/workshop-service/workshop-service';
import { PayloadPage } from '../payload/payload';

@Component({
  selector: 'page-payloads',
  templateUrl: 'payloads.html',
})
export class PayloadsPage {

  constructor(public nav: NavController, public navParams: NavParams, private workshop: WorkshopServiceProvider) {
  }

  editPayload (item) {
    this.nav.push(PayloadPage, {
      payloadId: item.id
    });
  }

  addPayload () {
    this.nav.push(PayloadPage);
  }

  backToGift () {
    this.nav.pop();
  }

}
