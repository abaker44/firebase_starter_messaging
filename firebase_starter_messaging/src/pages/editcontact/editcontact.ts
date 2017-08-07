import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { Login } from '../login/login';
import { ContactPage } from '../contact/contact';
import firebase from 'firebase';
import { FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-contact',
  templateUrl: 'editcontact.html'
})

export class EditContactPage {
  public editInfo;
  displayName;
  email;
  photoURL;
  user = firebase.auth().currentUser;
    userID = firebase.auth().currentUser.uid;
  constructor(public navCtrl: NavController, public authData: AuthData,
      public formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
        firebase.database().ref('/userProfile/' + this.userID).once('value', (snapshot) =>{
          this.displayName = snapshot.val().displayName;
          this.email = snapshot.val().email;
          this.photoURL = snapshot.val().photoURL;
        })

      this.editInfo = formBuilder.group({
         newName: [this.displayName],
         newEmail:[this.email]
      })
    }

   logOut() {
      this.authData.logoutUser().then(() => {
          this.navCtrl.setRoot(Login);
      });
  }
  updatePhoto() {
    // this.storageRef = firebase.storage().ref().child('images/image.png');
    //             this.storageRef.getDownloadURL().then(url =>
    //                 console.log(url)
    //             );
  }
  updateName() {
    this.user.updateProfile({
      displayName: this.editInfo.value.newName,
      photoURL: this.photoURL
    });
    let loader = this.loadingCtrl.create({
     content: "Saving Info...",
     duration: 3000
   });
   loader.present()
    this.navCtrl.setRoot(HomePage);
  }
}
