import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WorkshopServiceProvider } from '../../providers/workshop-service/workshop-service';
import { Payload } from '../../providers/workshop-service/workshop-service';

@Component({
  selector: 'page-payload',
  templateUrl: 'payload.html',
})
export class PayloadPage {
  payloadId: number;
  title: string;
  content: string;

  constructor(public nav: NavController, public navParams: NavParams, private workshop: WorkshopServiceProvider) {
    this.payloadId = this.navParams.get('payloadId');
    if (typeof(this.payloadId) != 'undefined') {
      this.title = this.workshop.gift.payloads[this.payloadId].title;
      this.content = this.workshop.gift.payloads[this.payloadId].content;
    }
  }

  submitPayload () {
    if (typeof(this.payloadId) == 'undefined') {
      var i = 0;
      while (typeof(this.payloadId) == 'undefined') {
        if (typeof(this.workshop.gift.payloads[i]) == 'undefined') {
          this.payloadId = i;
        }
        i++;
      }
      this.workshop.gift.payloads.push(new Payload(this.payloadId, this.title, this.content));
    } else {
      this.workshop.gift.payloads[this.payloadId].title = this.title;
      this.workshop.gift.payloads[this.payloadId].content = this.content;
    }
    this.workshop.storeGift();
    this.nav.pop();
  }

  payloadComplete () {
    return typeof(this.content) != 'undefined' && this.content.length > 0;
  }

  cancelPayload () {
    this.nav.pop();
  }

}
