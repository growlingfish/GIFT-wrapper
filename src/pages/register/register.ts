import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { WorkshopServiceProvider } from '../../providers/workshop-service/workshop-service';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  name: string;

  constructor(private nav: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private workshop: WorkshopServiceProvider, public storage: Storage) {}

  public register () {
    this.showLoading();
    this.storage.set('loginEmail', this.registerCredentials.email);
    this.auth.register(this.registerCredentials, this.name).subscribe(success => {
      if (success) {
        this.workshop.loadObjects(this.auth.currentUser.id).subscribe(data => {
          this.nav.setRoot(HomePage);
        },
        error => {
          this.showError("Registration failed");
        });
      } else {
        this.showError("User already registered");
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
