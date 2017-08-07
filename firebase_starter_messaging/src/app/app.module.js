var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SettingsPage } from '../pages/settingsPage/settingsPage';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { EditContactPage } from '../pages/editcontact/editcontact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPageDetail } from '../pages/aboutdetail/aboutdetail';
import { GroupsPage } from '../pages/groups/groups';
import { MessagesPageDraft } from '../pages/messagesdraft/messagesdraft';
import { MessagesPageView } from '../pages/messagesview/messagesview';

import { GroupsPageAdd } from '../pages/groupsadd/groupsadd';
import { GroupsPageDetails } from '../pages/groupsdetail/groupsdetail';
import { Login } from '../pages/login/login';
import { MessagesPage } from '../pages/messages/messages';
import { MessagesPageAdd } from '../pages/messagesadd/messagesadd';
import { AboutPageAdd } from '../pages/aboutadd/aboutadd';
import { ResetPassword } from '../pages/reset-password/reset-password';
import { Signup } from '../pages/signup/signup';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthData } from '../providers/auth-data';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            AboutPage,
            AboutPageAdd,
            MessagesPageView,
            AboutPageDetail,
            ContactPage,
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
            ContactPage,
            MessagesPageView,
            MessagesPage,
            MessagesPageAdd,
            MessagesPageDraft,
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
            { provide: ErrorHandler, useClass: IonicErrorHandler }
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map
