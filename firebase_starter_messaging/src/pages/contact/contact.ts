import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { SettingsPage } from '../settingsPage/settingsPage';
import { Login } from '../login/login';

import firebase from 'firebase';
import { EditContactPage } from '../editcontact/editcontact';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  displayName;
  email;
  photoURL;
  user = firebase.auth().currentUser.uid;
  constructor(public navCtrl: NavController, public authData: AuthData) {
    firebase.database().ref('/userProfile/' + this.user).once('value', (snapshot) =>{
      this.displayName = snapshot.val().displayName;
      this.email = snapshot.val().email;
      this.photoURL = snapshot.val().photoURL;
    })
    }
   goToSettings() {
          this.navCtrl.push(SettingsPage);
  }
  editContact(){
    this.navCtrl.push(EditContactPage);
  }
  logOut() {
     this.authData.logoutUser().then(() => {
         this.navCtrl.setRoot(Login);
     });
 }
}
