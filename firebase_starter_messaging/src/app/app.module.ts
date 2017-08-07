import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import {SettingsPage} from '../pages/settingsPage/settingsPage'
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { EditContactPage } from '../pages/editcontact/editcontact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPageDetail } from '../pages/aboutdetail/aboutdetail';
import { GroupsPage } from '../pages/groups/groups';
import { GroupsPageAdd } from '../pages/groupsadd/groupsadd';
import { GroupsPageDetails } from '../pages/groupsdetail/groupsdetail';
import { Login } from '../pages/login/login';
import { MessagesPage } from '../pages/messages/messages';
import { MessagesPageAdd } from '../pages/messagesadd/messagesadd';
import { MessagesPageDraft } from '../pages/messagesdraft/messagesdraft';
import { MessagesPageView } from '../pages/messagesview/messagesview';


import { AboutPageAdd } from '../pages/aboutadd/aboutadd';
import {ResetPassword}from '../pages/reset-password/reset-password';
import {Signup} from '../pages/signup/signup';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthData } from '../providers/auth-data';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AboutPageAdd,
    AboutPageDetail,
    ContactPage,
    MessagesPageView,
    EditContactPage,
    MessagesPage,
    MessagesPageAdd,
    MessagesPageDraft,
    HomePage,
    TabsPage,
    GroupsPage,
    GroupsPageAdd,
    GroupsPageDetails,
    Login,
    ResetPassword,
    SettingsPage,
    Signup
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AboutPageAdd,
    AboutPageDetail,
    MessagesPageDraft,
    ContactPage,
    MessagesPage,
    MessagesPageAdd,
    MessagesPageView,
    EditContactPage,
    HomePage,
    GroupsPage,
    GroupsPageAdd,
    GroupsPageDetails,
    TabsPage,
    Login,
    ResetPassword,
    SettingsPage,
    Signup
  ],
  providers: [
      AuthData,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
