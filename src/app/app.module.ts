import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WorkshopPage } from '../pages/workshop/workshop';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { TitlePage } from '../pages/title/title';
import { ReceiverPage } from '../pages/receiver/receiver';
import { GiftcardPage } from '../pages/giftcard/giftcard';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { GlobalVarProvider } from '../providers/global-var/global-var';
import { WorkshopServiceProvider } from '../providers/workshop-service/workshop-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LogoutPage,
    LoginPage,
    WorkshopPage,
    TitlePage,
    ReceiverPage,
    GiftcardPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LogoutPage,
    LoginPage,
    WorkshopPage,
    TitlePage,
    ReceiverPage,
    GiftcardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    GlobalVarProvider,
    WorkshopServiceProvider,
  ]
})
export class AppModule {}
