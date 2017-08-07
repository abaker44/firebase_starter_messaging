import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';

import { SettingsPage } from '../settingsPage/settingsPage';

import { HomePage } from '../home/home';
import { FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';

@Component({
  selector: 'page-about',
  templateUrl: 'aboutadd.html'
})
export class AboutPageAdd {
public addEventForm;
  constructor(public navCtrl: NavController, public authData: AuthData,  public formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
    this.addEventForm = formBuilder.group({
       eventName: [''],
       eventDate: [''],
       eventLocation: [''],
       eventDetails: [''],
       eventPublic: [true]
    })
  }
   settings() {
          this.navCtrl.setRoot(SettingsPage);
  }
  addEvent() {
    var currentUserId = firebase.auth().currentUser.uid;
    firebase.database().ref('events/').push().set({
      title: this.addEventForm.value.eventName,
      date: this.addEventForm.value.eventDate,
      location: this.addEventForm.value.eventLocation,
      details: this.addEventForm.value.eventDetails,
      public:  this.addEventForm.value.eventPublic,
      "members": {[currentUserId] : "owner"},
      going: {[currentUserId] : true}
    })

    let loader = this.loadingCtrl.create({
     content: "Saving Event...",
     duration: 3000
   });
   loader.present()
    this.navCtrl.setRoot(HomePage);
  }
}
