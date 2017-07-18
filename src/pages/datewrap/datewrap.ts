import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { WorkshopServiceProvider } from '../../providers/workshop-service/workshop-service';

@Component({
  selector: 'page-datewrap',
  templateUrl: 'datewrap.html',
})
export class DatewrapPage {
  date: string = new Date().toISOString();
  wrapId: number;

  constructor(public nav: NavController, public navParams: NavParams, public viewCtrl: ViewController, private workshop: WorkshopServiceProvider) {
    this.wrapId = navParams.get('wrapId');
    for (var i = 0; i < this.workshop.gift.getWrapWithID(this.wrapId).challenges.length; i++) {
      if (this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].type == 'date') {
        console.log(this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].task.substring(4, 6) + " "
          + this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].task.substring(6, 8) + " "
          + this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].task.substring(0, 4)); 
        this.date = new Date(
          parseInt(this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].task.substring(0, 4)),
          parseInt(this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].task.substring(4, 6)),
          parseInt(this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].task.substring(6, 8))
        ).toISOString();
        break;
      }
    }
  }

  cancelDate () {
    this.viewCtrl.dismiss();
  }

  submitDate () {
    var date = new Date(this.date);
    var dateString = "" + date.getFullYear() 
      + (date.getMonth()<10? '0'+date.getMonth():''+date.getMonth()) 
      + (date.getDate()<10? '0'+date.getDate():''+date.getDate());
    this.workshop.gift.getWrapWithID(this.wrapId).setChallenge('date', dateString); //YYYYMMDD 
    this.workshop.storeGift();
    this.viewCtrl.dismiss();
  }

  dateAdded () {
    for (var i = 0; i < this.workshop.gift.getWrapWithID(this.wrapId).challenges.length; i++) {
      if (this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].type == 'date') {
        return true;
      }
    }
    return false;
  }

  scrapDate () {
    for (var i = 0; i < this.workshop.gift.getWrapWithID(this.wrapId).challenges.length; i++) {
      if (this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].type == 'date') {
        this.workshop.gift.getWrapWithID(this.wrapId).challenges.splice(i, 1);
      }
    }
    this.cancelDate()
  }

}
