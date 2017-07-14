import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

export class Gift {
  title: string;
  receiver: string;
  wraps: Array<Wrap>;
  payloads: Array<Payload>;
  giftcard: Giftcard;

  constructor() {
    this.title = null;
    this.receiver = null;
    this.wraps = [];
    this.payloads = [];
    this.giftcard = null;
  }

  isFinished () {
    return (
      this.titleComplete()
      && this.receiverComplete()
      && this.wrapsComplete()
      && this.payloadsComplete()
      && this.giftcardComplete()
    );
  }

  titleComplete () {
    return this.title !== null && this.title.length > 0;
  }

  receiverComplete () {
    return this.receiver !== null && this.receiver.length > 0;
  }

  wrapsComplete () {
    return this.wraps !== null && this.wraps.length > 0;
  }

  payloadsComplete () {
    return this.payloads !== null && this.payloads.length > 0;
  }

  giftcardComplete () {
    return this.giftcard !== null && this.giftcard.content.length > 0
      && this.giftcard.title.length > 0;
  }
}

export class Wrap {
  id: number;
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
  id: number;
  title: string;
  content: string;

  constructor(id: number, title: string, content: string) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
}

export class Challenge {
  type: string;
  task: string;
  completed: boolean;

  constructor (type: string, task: string) {
    this.type = type;
    this.task = task;
  }
}

export class Giftcard {
  title: string;
  content: string;

  constructor (title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}

@Injectable()
export class WorkshopServiceProvider {
  gift: Gift;

  constructor(public http: Http, private storage: Storage) {
    this.gift = null;
    storage.get('workingGift').then((workingGift) => {
      this.gift = new Gift();
      if (typeof(workingGift.title) !== "undefined") {
        this.gift.title = workingGift.title;
      }
      if (typeof(workingGift.receiver) !== "undefined") {
        this.gift.receiver = workingGift.receiver;
      }
      workingGift.wraps.forEach(wrap => {
        this.gift.wraps.push(new Wrap(wrap.title));
      });
      workingGift.payloads.forEach(payload => {
        this.gift.payloads.push(new Payload(payload.id, payload.title, payload.content));
      });
      if (typeof(workingGift.giftcard) !== "undefined") {
        this.gift.giftcard = new Giftcard(workingGift.giftcard.title, workingGift.giftcard.content);
      }
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
    this.storeGift();
  }

  storeGift () {
    this.storage.set('workingGift', this.gift);
  }

  sendGift () {
    console.log("send");
  }

  scrapGift () {
    this.gift = null;
    this.storage.remove('workingGift');
  }

}
