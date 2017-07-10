import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };

  constructor(private nav: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public storage: Storage) {
    storage.get('loginEmail').then((loginEmail) => {
      this.registerCredentials.email = loginEmail;
    }).catch(
      console.log.bind(console)
    );
  }

  public createAccount() {
    console.log("Registration?");
  }

  public login() {
    this.showLoading();
    this.storage.set('loginEmail', this.registerCredentials.email);
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        this.nav.setRoot(HomePage);
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
