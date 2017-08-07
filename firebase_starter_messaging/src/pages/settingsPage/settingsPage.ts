import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { Login } from '../login/login';

@Component({
  selector: 'page-settingsPage',
  templateUrl: 'settingsPage.html'
})
export class SettingsPage {

    constructor(public navCtrl: NavController, public authData: AuthData) {
  }
  logOut() {
      this.authData.logoutUser().then(() => {
          this.navCtrl.setRoot(Login);
      });
  }
}
