import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public nav: NavController, public navParams: NavParams, private storage: Storage, private auth: AuthServiceProvider) {
    this.storage.get('introDone').then((introDone) => {
      if (introDone == null) {
        this.storage.set('introDone', true);
      } else {
        this.finishIntro();
      }
    }).catch(
      console.log.bind(console)
    );
  }

  finishIntro () {
    if (this.auth.currentUser == null) {
      this.nav.setRoot(LoginPage);
    } else {
      this.nav.setRoot(HomePage);
    }
  }
}