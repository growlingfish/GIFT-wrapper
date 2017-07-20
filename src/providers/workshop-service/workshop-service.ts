import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { GlobalVarProvider } from '../../providers/global-var/global-var';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

export class Gift {
  title: string;
  receiver: string; // email
  receiverName: string;
  wraps: Array<Wrap>;
  payloads: Array<Payload>;
  giftcard: Giftcard;

  constructor() {
    this.title = null;
    this.receiver = null;
    this.receiverName = null;
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
    return this.receiver !== null && this.receiver.length > 0
      && this.receiverName !== null && this.receiverName.length > 0;
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

  getWrapWithID (wrapId) {
    for (let i = 0; i < this.wraps.length; i++) {
      if (this.wraps[i].id == wrapId) {
        return this.wraps[i];
      }
    }
  }
}

export class Wrap {
  id: number;
  title: string;
  challenges: Array<Challenge>;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
    this.challenges = [];
  }

  public setChallenge (type: string, task: string) {
    for (var i = 0; i < this.challenges.length; i++) {
      if (this.challenges[i].type == type) {
        this.challenges[i].task = task;
        return;
      }
    }
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

export class Object {
  id: number;
  title: string;
  content: string;
  image: string;

  constructor (id: number, title: string, content: string, image: string) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.image = image;
  }
}

@Injectable()
export class WorkshopServiceProvider {
  gift: Gift;
  objects: Array<Object>;

  constructor(public http: Http, private storage: Storage, private globalVar: GlobalVarProvider, private auth: AuthServiceProvider) {
    this.gift = null;
    storage.get('workingGift').then((workingGift) => {
      this.gift = new Gift();
      if (typeof(workingGift.title) !== "undefined") {
        this.gift.title = workingGift.title;
      }
      if (typeof(workingGift.receiver) !== "undefined") {
        this.gift.receiver = workingGift.receiver;
      }
      if (typeof(workingGift.receiverName) !== "undefined") {
        this.gift.receiverName = workingGift.receiverName;
      }
      workingGift.wraps.forEach(wrap => {
        var w = new Wrap(wrap.id, wrap.title);
        for (var i = 0; i < wrap.challenges.length; i++) {
          w.setChallenge(wrap.challenges[i].type, wrap.challenges[i].task);
        }
        this.gift.wraps.push(w);
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
    return Observable.create(observer => {
      let body = new URLSearchParams();
      body.append('sender', this.auth.currentUser.id.toString());
      body.append('gift', JSON.stringify(this.gift));
      this.http.post(this.globalVar.getSendGiftURL(), body)
        .map(response => response.json())
        .subscribe(data => {
          console.log(data);
          if (data.success) {
            observer.next(true);
            observer.complete();
          } else {
            observer.next(false);
            observer.complete();
          }
        },
        function (error) {
          console.log(error);
          observer.next(false);
          observer.complete();
        });
    });
  }

  scrapGift () {
    this.gift = null;
    this.storage.remove('workingGift');
  }

  checkReceiver (email) {
    return Observable.create(observer => {
      this.http.get(this.globalVar.getValidateReceiverURL(email))
        .map(response => response.json())
        .subscribe(data => {
          if (data.success) {
            if (data.exists) {
              observer.next(true);
            } else {
              observer.next(false);
            }
            observer.complete();
          } else {
            console.log(data);
            observer.next(false);
            observer.complete();
          }
        },
        function (error) {
          console.log(error);
          observer.next(false);
          observer.complete();
        });
    });
  }

  setupReceiver (email, name) {
    return Observable.create(observer => {
      this.http.get(this.globalVar.getSetupReceiverURL(email, name, this.auth.currentUser.id))
        .map(response => response.json())
        .subscribe(data => {
          if (data.success) {
            observer.next(true);
            observer.complete();
          } else {
            console.log(data);
            observer.next(false);
            observer.complete();
          }
        },
        function (error) {
          console.log(error);
          observer.next(false);
          observer.complete();
        });
    });
  }

  loadObjects (ownerId) {
    return Observable.create(observer => {
      this.http.get(this.globalVar.getObjectsURL(ownerId))
        .map(response => response.json())
        .subscribe(data => {
          this.objects = [];
          for (let i = 0; i < data.objects.length; i++) {
            var object = new Object(
              data.objects[i].ID,
              data.objects[i].post_title,
              data.objects[i].post_content,
              (typeof(data.objects[i].post_image) != 'undefined' ? data.objects[i].post_image : 'http://placehold.it/100x100')
            );
            this.objects.push(object);
          }
          console.log(this.objects);
          observer.next(true);
          observer.complete();
        },
        function (error) {
          observer.next(false);
          observer.complete();
        });
    });
  }

  finaliseObject (name, description, filename) {
    return Observable.create(observer => {
      let body = new URLSearchParams();
      body.append('filename', filename);
      body.append('name', name);
      body.append('description', description);
      body.append('owner', this.auth.currentUser.id.toString());
      this.http.post(this.globalVar.getFinaliseObjectURL(), body)
        .map(response => response.json())
        .subscribe(data => {
          if (data.success) {
            var object = new Object(
              data.objectid,
              name,
              description,
              data.thumbnail
            );
            this.objects.unshift(object);
            observer.next(object);
            observer.complete();
          } else {
            console.log(data);
            observer.next(null);
            observer.complete();
          }
        },
        function (error) {
          console.log(error);
          observer.next(null);
          observer.complete();
        });
    });
  }
}
