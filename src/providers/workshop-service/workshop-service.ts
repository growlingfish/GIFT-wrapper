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
      this.titleComplete()
      && this.receiverComplete()
      && this.wrapsComplete()
      && this.payloadsComplete()
    );
  }

  titleComplete () {
    return this.title !== undefined && this.title.length > 0;
  }

  receiverComplete () {
    return this.receiver !== undefined && this.receiver.length > 0;
  }

  wrapsComplete () {
    return this.wraps !== undefined && this.wraps.length > 0;
  }

  payloadsComplete () {
    return this.payloads !== undefined && this.payloads.length > 0;
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
    this.gift = null;
    storage.get('workingGift').then((workingGift) => {
      this.gift = new Gift();
      if (workingGift.title !== undefined) {
        this.gift.title = workingGift.title;
      }
      if (workingGift.receiver !== undefined) {
        this.gift.receiver = workingGift.receiver;
      }
      workingGift.wraps.forEach(wrap => {
        this.gift.wraps.push(new Wrap(wrap.title));
      });
      workingGift.payloads.forEach(payload => {
        this.gift.payloads.push(new Payload(payload.title, payload.content));
      });
    }).catch(
      console.log.bind(console)
    );
  }

  giftIsStarted () {
    if (this.gift == null) {
      return false;
    }
    return true;
  }

  giftIsFinished () {
    if (this.gift == null) {
      return false;
    }
    return this.gift.isFinished();
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
