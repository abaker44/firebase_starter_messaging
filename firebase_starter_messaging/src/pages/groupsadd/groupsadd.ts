import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { Login } from '../login/login';
import { HomePage } from '../home/home';
import { FormBuilder, Validators } from '@angular/forms';

import firebase from 'firebase';

@Component({
  selector: 'page-groupsadd',
  templateUrl: 'groupsadd.html'
})
export class GroupsPageAdd {
public addGroupForm;
    constructor(public navCtrl: NavController, public authData: AuthData,  public formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
	this.addGroupForm = formBuilder.group({
       groupName: [''],
       groupDetails: [''],
       groupPublic: [true]
    })
  }

  logOut() {
      this.authData.logoutUser().then(() => {
          this.navCtrl.setRoot(Login);
      });
  }

   addGroup() {
     var currentUserId = firebase.auth().currentUser.uid;
    firebase.database().ref('groups/').push().set({
      groupName: this.addGroupForm.value.groupName,
      groupDetails: this.addGroupForm.value.groupDetails,
      public: this.addGroupForm.value.groupPublic,
        "members": {[currentUserId] : "owner"}
    })
    let loader = this.loadingCtrl.create({
     content: "Saving Event...",
     duration: 3000
   });
   loader.present()
    this.navCtrl.setRoot(HomePage);
  }
}
