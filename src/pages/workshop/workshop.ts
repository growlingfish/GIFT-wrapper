import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { WorkshopServiceProvider } from '../../providers/workshop-service/workshop-service';
import { User } from '../../providers/auth-service/auth-service';
import { TitlePage } from '../title/title';
import { ReceiverPage } from '../receiver/receiver';
import { GiftcardPage } from '../giftcard/giftcard';
import { PayloadsPage } from '../payloads/payloads';
import { WrapsPage } from '../wraps/wraps';

@Component({
  selector: 'page-workshop',
  templateUrl: 'workshop.html',
})
export class WorkshopPage {
  currentUser: User;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, private workshop: WorkshopServiceProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.currentUser = this.auth.getUserInfo();
  }

  scrapGift () {
    this.workshop.scrapGift();
    this.navCtrl.popToRoot();
  }

  sendGift () {
    let alert = this.alertCtrl.create({
    title: 'Confirm',
    message: 'Once you have sent your gift you cannot change or recall it. Do you want to send?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Send!',
        handler: () => {
          let navTransition = alert.dismiss();
          navTransition.then(() => {
            this.showLoading();
            this.workshop.sendGift()
              .subscribe(sent => {
                console.log(sent);
                this.workshop.scrapGift();
                this.navCtrl.popToRoot();
              },
              error => {
                console.log("Sending gift failed");
              });
          });
        }
      }
      ]
    });
    alert.present();
  }

  editTitle () {
    this.navCtrl.push(TitlePage);
  }

  editReceiver () {
    this.navCtrl.push(ReceiverPage);
  }

  editPayloads () {
    this.navCtrl.push(PayloadsPage);
  }

  editWraps () {
    this.navCtrl.push(WrapsPage);
  }

  editGiftcard () {
    this.navCtrl.push(GiftcardPage);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
}
