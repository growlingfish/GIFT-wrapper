import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { WorkshopServiceProvider } from '../../providers/workshop-service/workshop-service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalVarProvider } from '../../providers/global-var/global-var';
import { HomePage } from '../../pages/home/home';
import { TitlePage } from '../../pages/title/title';

@Component({
  selector: 'page-receiver',
  templateUrl: 'receiver.html',
})
export class ReceiverPage {
  receiverText: string;
  receiverName: string;
  loading: Loading;

  constructor(public nav: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private globalVar: GlobalVarProvider, private workshop: WorkshopServiceProvider, public http: Http) {
    if (this.workshop.gift.receiverComplete()) {
      this.receiverText = this.workshop.gift.receiver;
      this.receiverName = this.workshop.gift.receiverName;
    }
  }

  receiverValid () {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(this.receiverText) && (this.receiverName != null && this.receiverName.length > 0);
  }

  cancelReceiver () {
    this.nav.pop();
  }

  submitReceiver () {
    this.workshop.gift.receiver = this.receiverText;
    this.workshop.gift.receiverName = this.receiverName;
    this.workshop.storeGift();

    this.checkReceiver();
  }

  checkReceiver () {
    this.showLoading();
    this.workshop.checkReceiver(this.receiverText)
      .subscribe(exists => {
        if(!exists) {
          let confirm = this.alertCtrl.create({
            title: 'Send an invite',
            message: "Your recipient hasn't received a gift before. If you carry on they will automatically be registered and will receive an email letting them know how to get your gift.",
            buttons: [
              {
                text: 'Scrap gift',
                handler: () => {
                  this.workshop.scrapGift();
                  //this.nav.popToRoot();
                  this.nav.setRoot(HomePage);
                }
              },
              {
                text: 'OK, carry on',
                handler: () => {
                  this.workshop.setupReceiver(this.receiverText, this.receiverName)
                    .subscribe(done => {
                      if (!done) {
                        console.log("Setting up receiver failed");
                      }
                      this.loading.dismiss();
                      //this.nav.pop();
                      
                      this.nav.push(TitlePage); 
                    },
                    error => {
                      console.log("Setting up receiver failed");
                      this.loading.dismiss();
                      this.nav.pop();
                    });
                }
              }
            ]
          });
          confirm.present();
        } else {
          //this.nav.pop();
          this.nav.push(TitlePage); 
        }
      },
      error => {
        console.log("Validating receiver failed");
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
