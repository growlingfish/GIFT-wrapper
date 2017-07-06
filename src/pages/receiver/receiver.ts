import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { WorkshopServiceProvider } from '../../providers/workshop-service/workshop-service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalVarProvider } from '../../providers/global-var/global-var';

@Component({
  selector: 'page-receiver',
  templateUrl: 'receiver.html',
})
export class ReceiverPage {
  receiverText: string;
  loading: Loading;

  constructor(public nav: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private globalVar: GlobalVarProvider, private workshop: WorkshopServiceProvider, public http: Http) {
    if (this.workshop.gift.receiverComplete()) {
      this.receiverText = this.workshop.gift.receiver;
    }
  }

  receiverValid () {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(this.receiverText);
  }

  cancelReceiver () {
    this.nav.pop();
  }

  submitReceiver () {
    this.workshop.gift.receiver = this.receiverText;
    this.workshop.storeGift();

    this.checkReceiver();
  }

  checkReceiver () {
    this.showLoading();
    this.http.get(this.globalVar.getValidateReceiverURL(this.receiverText))
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        if (data.success) {
          if(!data.exists) {
            let confirm = this.alertCtrl.create({
              title: 'Send an invite',
              message: "Your recipient hasn't received or created a Gift before. When you send your gift, they will automatically be registered but will still need to choose to download the Unwrapper app before they can receive your gift.",
              buttons: [
                {
                  text: 'Scrap gift',
                  handler: () => {
                    this.workshop.scrapGift();
                    this.nav.popToRoot();
                  }
                },
                {
                  text: 'OK, carry on'
                }
              ]
            });
            confirm.present();
          } else {
            this.nav.pop();
          }
        } else {
          this.nav.pop();
        }
      },
      function (error) {
        console.log(error);
        this.nav.pop();
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
