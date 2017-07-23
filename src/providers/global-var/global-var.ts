import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVarProvider {

  apiBase: string;
  notificationBase: string;
  uploadBase: string;
  mapboxToken: string;
  latitude: number;
  longitude: number;
  stranger: boolean;

  constructor() {
    //this.apiBase = "https://gifting.dev/wp-json/gift/v1/";
    this.apiBase = "https://gifting.digital/wp-json/gift/v1/";
    this.notificationBase = "https://chat.gifting.digital/api/";
    this.mapboxToken = 'pk.eyJ1IjoiZ3Jvd2xpbmdmaXNoIiwiYSI6ImNqNGI3cGh0eTA3MmQycW85YmNsZGNuYjgifQ.fj1kKjkslfyuf0t4ELM1zw';

    this.stranger = false;
    
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

  getRegisterURL (user, name, pass) {
    return this.getApiBase() + "new/sender/" + user + "/" + name + "/" + pass;
  }

  getValidateReceiverURL (email) {
    return this.getApiBase() + "validate/receiver/" + email;
  }

  getSetupReceiverURL (email, name, from) {
    return this.getApiBase() + "new/receiver/" + email + "/" + name + "/" + from;
  }

  getObjectsURL (userId) {
    return this.getApiBase() + "objects/" + userId;
  }

  getObjectPhotoUploadURL () {
    return this.getApiBase() + "upload/object/";
  }

  getFinaliseObjectURL () {
    return this.getApiBase() + "new/object/";
  }

  getSendGiftURL () {
    return this.getApiBase() + "new/gift/";
  }
}
