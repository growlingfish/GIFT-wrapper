import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { WorkshopServiceProvider } from '../../providers/workshop-service/workshop-service';
import { HomePage } from '../../pages/home/home';
import { LogoutPage } from '../../pages/logout/logout';

@Component({
  selector: 'page-title',
  templateUrl: 'title.html',
})
export class TitlePage {
  titleText: string;
  loading: Loading;

  constructor(public nav: NavController, public navParams: NavParams, private workshop: WorkshopServiceProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
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
    //this.nav.pop();
    /* For Sprint */
    this.sendGift();
  }

  titleComplete () {
    return typeof(this.titleText) != 'undefined' && this.titleText.length > 0;
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
          this.showLoading();
          this.workshop.sendGift()
            .subscribe(sent => {
              console.log(sent);
              this.workshop.scrapGift();
              let another = this.alertCtrl.create({
                title: 'Another?',
                message: 'Would you like to keep creating more gifts?',
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
                      this.nav.setRoot(HomePage);
                    }
                  }
                ]
              });
              another.present();
            },
            error => {
              console.log("Sending gift failed");
            });
        }
      }
      ]
    });
    alert.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
