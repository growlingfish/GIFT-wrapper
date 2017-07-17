import { Component } from '@angular/core';
import { Platform, NavController, NavParams, ViewController, AlertController, ActionSheetController, ToastController, LoadingController, Loading } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { WorkshopServiceProvider, Object } from '../../providers/workshop-service/workshop-service';
import { GlobalVarProvider } from '../../providers/global-var/global-var';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

declare var cordova: any;

@Component({
  selector: 'page-objectwrap',
  templateUrl: 'objectwrap.html',
})
export class ObjectwrapPage {
  wrapId: number;
  lastImage: string = null;
  loading: Loading;
  uploadedFilename: string = null;
  name: string = null;
  description: string = null;

  constructor(public platform: Platform, public nav: NavController, public params: NavParams, public viewCtrl: ViewController, private workshop: WorkshopServiceProvider, private alertCtrl: AlertController, private camera: Camera, public actionSheetCtrl: ActionSheetController, private filePath: FilePath, private file: File, public toastCtrl: ToastController, private globalVar: GlobalVarProvider, public loadingCtrl: LoadingController, private transfer: Transfer, private auth: AuthServiceProvider, public http: Http) {
    this.wrapId = this.params.get('wrapId');
  }

  dismiss () {
    this.viewCtrl.dismiss();
  }

  objectSelected (objectId) {
    var objectSelected = -1;
    for (var i = 0; i < this.workshop.gift.getWrapWithID(this.wrapId).challenges.length; i++ ) {
      if (this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].type == 'object') {
        if (this.workshop.gift.getWrapWithID(this.wrapId).challenges[i].task == objectId) {
          return true;
        }
      }
    }
    return false;
  }

  newObject () {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      subTitle: 'Choose a photograph of the exhibit',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            let navTransition = actionSheet.dismiss();
            navTransition.then(() => {
              this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
            });
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            let navTransition = actionSheet.dismiss();
            navTransition.then(() => {
              this.takePicture(this.camera.PictureSourceType.CAMERA);
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  // https://devdactic.com/ionic-2-images/

  takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 80,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
  
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
  
  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.uploadImage();
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
  
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage() {
    // Destination URL
    var url = this.globalVar.getObjectPhotoUploadURL();
  
    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
  
    // File name only
    var filename = this.lastImage;
  
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {
        'fileName': filename,
        'wrapId': this.wrapId,
        'userId': this.auth.currentUser.id
      }
    };
  
    const fileTransfer: TransferObject = this.transfer.create();
  
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();
  
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismissAll();
      let response = JSON.parse(data.response);
      console.log(response);
      if (response.success) {
        this.uploadedFilename = response.filename;
        let namePrompt = this.alertCtrl.create({
          title: 'Name',
          message: "Enter the name of the exhibit",
          inputs: [
            {
              name: 'name',
              placeholder: 'Name'
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                this.uploadedFilename = null;
              }
            },
            {
              text: 'Next',
              handler: data => {
                this.name = data.name;
                let firstNavTransition = namePrompt.dismiss();
                firstNavTransition.then(() => {
                  let descriptionPrompt = this.alertCtrl.create({
                    title: 'Description',
                    message: "Now enter a short description of the exhibit and where to find it",
                    inputs: [
                      {
                        name: 'description',
                        placeholder: 'Description'
                      },
                    ],
                    buttons: [
                      {
                        text: 'Cancel',
                        handler: data => {
                          this.name = null;
                        }
                      },
                      {
                        text: 'Save',
                        handler: data => {
                          this.description = data.description;
                          let finalNavTransition = namePrompt.dismiss();
                          finalNavTransition.then(() => {
                            this.loading = this.loadingCtrl.create({
                              content: 'Adding exhibit ...',
                            });
                            this.loading.present();
                            this.workshop.finaliseObject(this.name, this.description, this.uploadedFilename).subscribe(added => {
                              if (added) {
                                this.workshop.gift.getWrapWithID(this.wrapId).setChallenge('object', added.id);
                                this.dismiss();
                              } else {
                                console.log("Object add failed");
                              }
                              this.loading.dismiss();
                            },
                            error => {
                              console.log(error);
                              this.loading.dismiss();
                            });
                          });
                        }
                      }
                    ]
                  });
                  descriptionPrompt.present();
                });
              }
            }
          ]
        });
        namePrompt.present();
      } else {
        this.presentToast('Error while uploading file.');
      }
    }, err => {
      this.loading.dismissAll();
      console.log(err);
      this.presentToast('Error while uploading file.');
    });
  }

  itemTapped (objectId) {
    this.workshop.gift.getWrapWithID(this.wrapId).setChallenge('object', objectId);
    this.dismiss();
  }

}
