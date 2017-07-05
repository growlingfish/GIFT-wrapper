import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { User } from '../../providers/auth-service/auth-service';
import { WorkshopPage } from '../workshop/workshop';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currentUser: User;

  constructor(private nav: NavController, private auth: AuthServiceProvider) {
    this.currentUser = auth.getUserInfo();
  }

  public openWorkshop () {
    this.nav.push(WorkshopPage);
  }
}
