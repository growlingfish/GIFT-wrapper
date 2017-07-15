import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { WorkshopServiceProvider } from '../../providers/workshop-service/workshop-service';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };

  constructor(private nav: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public storage: Storage, private workshop: WorkshopServiceProvider) {
    storage.get('loginEmail').then((loginEmail) => {
      this.registerCredentials.email = loginEmail;
    }).catch(
      console.log.bind(console)
    );
  }

  public login() {
    this.showLoading();
    this.storage.set('loginEmail', this.registerCredentials.email);
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        this.workshop.loadObjects(this.auth.currentUser.id).subscribe(data => {
          console.log(data);
          this.nav.setRoot(HomePage);
        },
        error => {
          this.showError("Loading objects failed");
        });
      } else {
        this.showError("Access Denied");
      }
    },
    error => {
      this.showError(error);
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
