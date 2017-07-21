import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { WorkshopServiceProvider } from '../../providers/workshop-service/workshop-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Payload } from '../../providers/workshop-service/workshop-service';
import { TitlePage } from '../../pages/title/title';
import { LogoutPage } from '../../pages/logout/logout';

@Component({
  selector: 'page-payload',
  templateUrl: 'payload.html',
})
export class PayloadPage {
  payloadId: number;
  title: string;
  content: string;
  loading: Loading;
  receiverName: string;
  receiver: string;

  constructor(public nav: NavController, public navParams: NavParams, private workshop: WorkshopServiceProvider, private auth: AuthServiceProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
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
      this.workshop.gift.payloads.push(new Payload(this.payloadId, this.auth.currentUser.name + "'s payload started at " + (new Date().toISOString()), this.content));
    } else {
      this.workshop.gift.payloads[this.payloadId].title = this.title;
      this.workshop.gift.payloads[this.payloadId].content = this.content;
    }
    this.workshop.storeGift();
    //this.nav.pop();

    /* For Sprint */
    this.sendGift();
  }

  payloadComplete () {
    return typeof(this.content) != 'undefined' && this.content.length > 0;
  }

  cancelPayload () {
    this.nav.pop();
  }

  sendGift () {
    this.showLoading();
    this.workshop.sendGift()
      .subscribe(sent => {
        console.log(sent);
        /* For Sprint */
        this.receiver = this.workshop.gift.receiver;
        this.receiverName = this.workshop.gift.receiverName;

        this.workshop.scrapGift();
        let alert = this.alertCtrl.create({
          title: 'Another?',
          message: 'That part of the gift has been sent to ' + this.receiverName + '. Would you like to add another part to the gift?',
          buttons: [
            {
              text: 'No, thanks',
              role: 'cancel',
              handler: () => {
                this.nav.setRoot(LogoutPage);
              }
            },
            {
              text: 'Yes!',
              handler: () => {
                /* For Sprint */
                this.workshop.startGift();
                this.workshop.gift.receiver = this.receiver;
                this.workshop.gift.receiverName = this.receiverName;

                this.nav.setRoot(TitlePage);
              }
            }
          ]
        });
        alert.present();
      },
      error => {
        console.log("Sending gift failed");
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
