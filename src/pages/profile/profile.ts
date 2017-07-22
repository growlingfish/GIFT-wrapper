import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { WorkshopServiceProvider } from '../../providers/workshop-service/workshop-service';
import { GiftcardPage } from '../giftcard/giftcard';
import { TitlePage } from '../title/title';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  receiverText: string;
  receiverName: string;
  loading: Loading;

  constructor(public nav: NavController, public navParams: NavParams, private auth: AuthServiceProvider, public loadingCtrl: LoadingController, private workshop: WorkshopServiceProvider) {
  }

  chooseLocal () {
    this.receiverText = 'localbrighton@gifting.digital';
    this.receiverName = 'the Local';
    this.setReceiver();
  }

  chooseOutOfTown () {
    this.receiverText = 'outoftownbrighton@gifting.digital';
    this.receiverName = 'the Out-of-towner';
    this.setReceiver();
  }

  setReceiver () {
    this.showLoading();
    this.workshop.checkReceiver(this.receiverText)
      .subscribe(exists => {
        if(!exists) {
          this.nav.pop();
        } else {
          this.workshop.gift.receiver = this.receiverText;
          this.workshop.gift.receiverName = this.receiverName;
          this.workshop.storeGift();
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
