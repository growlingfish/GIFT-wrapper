import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class GlobalVarProvider {

  apiBase: string;
  notificationBase: string;
  nearThreshold: number;
  mapboxToken: string;
  latitude: number;
  longitude: number;

  constructor() {
    //this.apiBase = "https://gifting.dev/wp-json/gift/v1/";
    this.apiBase = "https://gifting.digital/wp-json/gift/v1/";
    this.notificationBase = "https://chat.gifting.digital/api/";
    this.nearThreshold = 0.500; // in km
    this.mapboxToken = 'pk.eyJ1IjoiZ3Jvd2xpbmdmaXNoIiwiYSI6ImNqNGI3cGh0eTA3MmQycW85YmNsZGNuYjgifQ.fj1kKjkslfyuf0t4ELM1zw';
    
    // Nottingham
    this.latitude = 52.951693;
    this.longitude = -1.184210;
  }

  getApiBase () {
    return this.apiBase;
  }

  getNotificationsBase () {
    return this.notificationBase;
  }

  getAuthURL (user, pass) {
    return this.getApiBase() + "auth/" + user + "/" + pass;
  }

  getGiftsURL (userId) {
    return this.getApiBase() + "gifts/" + userId;
  }

  getDistance (lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a));
  }
}
