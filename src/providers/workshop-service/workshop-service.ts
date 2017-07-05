import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

export class Gift {
  title: string;
  receiver: string;
  wraps: Array<Wrap>;
  payloads: Array<Payload>;

  constructor() {
    this.wraps = [];
    this.payloads = [];
  }

  isFinished () {
    return (
      this.title && this.title.length > 0
      && this.receiver && this.receiver.length > 0
      && this.wraps && this.wraps.length > 0
      && this.payloads && this.payloads.length > 0
    );
  }
}

export class Wrap {
  title: string;
  challenges: Array<Challenge>;

  constructor(title: string) {
    this.title = title;
    this.challenges = [];
  }

  public setChallenge (type: string, task: string) {
    this.challenges.push(new Challenge(type, task));
  }
}

export class Payload {
  title: string;
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}

class Challenge {
  type: string;
  task: string;
  completed: boolean;

  constructor (type: string, task: string) {
    this.type = type;
    this.task = task;
  }
}

@Injectable()
export class WorkshopServiceProvider {
  gift: Gift;

  constructor(public http: Http, private storage: Storage) {
    storage.get('workingGift').then((workingGift) => {
      this.gift = workingGift;
    }).catch(
      console.log.bind(console)
    );
  }

  startGift () {
    this.gift = new Gift();
    this.storage.set('workingGift', this.gift);
  }

  sendGift () {

  }

  scrapGift () {
    this.gift = null;
    this.storage.remove('workingGift');
  }

}
