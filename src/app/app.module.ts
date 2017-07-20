import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WorkshopPage } from '../pages/workshop/workshop';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { TitlePage } from '../pages/title/title';
import { ReceiverPage } from '../pages/receiver/receiver';
import { GiftcardPage } from '../pages/giftcard/giftcard';
import { PayloadsPage } from '../pages/payloads/payloads';
import { PayloadPage } from '../pages/payload/payload';
import { WrapsPage } from '../pages/wraps/wraps';
import { WrapPage } from '../pages/wrap/wrap';
import { DatewrapPage } from '../pages/datewrap/datewrap';
import { KeywrapPage } from '../pages/keywrap/keywrap';
import { ArtcodewrapPage } from '../pages/artcodewrap/artcodewrap';
import { PlacewrapPage } from '../pages/placewrap/placewrap';
import { PersonalwrapPage } from '../pages/personalwrap/personalwrap';
import { ObjectwrapPage } from '../pages/objectwrap/objectwrap';
import { IntroPage } from '../pages/intro/intro';
import { ProfilePage } from '../pages/profile/profile';

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
    GiftcardPage,
    PayloadsPage,
    PayloadPage,
    WrapsPage,
    WrapPage,
    DatewrapPage,
    KeywrapPage,
    ArtcodewrapPage,
    PlacewrapPage,
    PersonalwrapPage,
    ObjectwrapPage,
    IntroPage,
    ProfilePage
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
    GiftcardPage,
    PayloadsPage,
    PayloadPage,
    WrapsPage,
    WrapPage,
    DatewrapPage,
    KeywrapPage,
    ArtcodewrapPage,
    PlacewrapPage,
    PersonalwrapPage,
    ObjectwrapPage,
    IntroPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    GlobalVarProvider,
    WorkshopServiceProvider,
    Camera,
    File,
    Transfer,
    FilePath,
  ]
})
export class AppModule {}
