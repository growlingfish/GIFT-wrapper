import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { WorkshopServiceProvider } from '../../providers/workshop-service/workshop-service';

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {
  receiverName: string;

  constructor(private nav: NavController, private navParams: NavParams, private auth: AuthServiceProvider, private workshop: WorkshopServiceProvider) {
    this.receiverName = this.navParams.get('receiverName');
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot(LoginPage)
    });
  }

}
