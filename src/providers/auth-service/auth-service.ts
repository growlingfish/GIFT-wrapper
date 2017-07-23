import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalVarProvider } from '../../providers/global-var/global-var';

export class User {
  name: string;
  email: string;
  id: number;

  constructor(name: string, email: string, id: number) {
    this.name = name;
    this.email = email;
    this.id = id;
  }
}

@Injectable()
export class AuthServiceProvider {

  currentUser: User;

  constructor (private globalVar: GlobalVarProvider, private http: Http) {}

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // don't have the data yet
      return Observable.create(observer => {
        this.http.get(this.globalVar.getAuthURL(credentials.email, credentials.password))
          .map(response => response.json())
          .subscribe(data => {
            var authed = false;
            if (typeof data.success !== 'undefined' && data.success) {
              this.currentUser = new User(data.name, credentials.email, data.id);
              authed = true;
            }
            observer.next(authed);
            observer.complete();
          },
          function (error) {
            observer.next(false);
            observer.complete();
          });
      });
    }
  }

  public register (credentials, name) {
    if (credentials.email === null || credentials.password === null || name === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // don't have the data yet
      return Observable.create(observer => {
        this.http.get(this.globalVar.getRegisterURL(credentials.email, name, credentials.password))
          .map(response => response.json())
          .subscribe(data => {
            var authed = false;
            if (typeof data.success !== 'undefined' && data.success) {
              this.currentUser = new User(name, credentials.email, data.new.id);
              authed = true;
            }
            observer.next(authed);
            observer.complete();
          },
          function (error) {
            observer.next(false);
            observer.complete();
          });
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}
