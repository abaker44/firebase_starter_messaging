var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import firebase from 'firebase';
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        var _this = this;
        this.rootPage = TabsPage;
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyAbbLo2-DzOIZix4zZOqGA3uMd7vZs8DTs",
            authDomain: "ionic-9c2d3.firebaseapp.com",
            databaseURL: "https://ionic-9c2d3.firebaseio.com/",
            projectId: "ionic-9c2d3",
            storageBucket: "gs://ionic-9c2d3.appspot.com",
            messagingSenderId: "739485368266"
        };
        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
                console.log("not login");
                _this.rootPage = Login;
            }
            else {
                console.log("login");
                _this.rootPage = HomePage;
                _this.rootPage = TabsPage;
            }
        });
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map