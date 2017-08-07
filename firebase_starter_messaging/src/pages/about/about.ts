import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { SettingsPage } from '../settingsPage/settingsPage';
import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';

import { AboutPageAdd } from '../aboutadd/aboutadd';
import { AboutPageDetail } from '../aboutdetail/aboutdetail';
import firebase from 'firebase';



@Component({
  selector: 'page-about',
  templateUrl: 'about.html'

})
export class AboutPage {
 private eventList: Array<any>;
 private keyList: Array<any>;

 public userProfileRef:firebase.database.Reference;
 public itemsRef;
  constructor(public navCtrl: NavController, public authData: AuthData, public loadingCtrl:LoadingController) {
    this.getPublicEvents();
  }
   goToSettings() {
          this.navCtrl.push(ContactPage);
  }
  addEvent() {
    this.navCtrl.push(AboutPageAdd);
  }
  getEventDetail(id: string){
    return this.itemsRef = firebase.database().ref('/events/' + id);
  }
  goToEventDetail(id: string) {
     this.navCtrl.push(AboutPageDetail,{
      paramId: id
    });
  }
  archive(key: string) {
    var event = firebase.database().ref('/events/' + key);
    event.remove();

    let loader = this.loadingCtrl.create({
     content: "Deleting Event...",
     duration: 3000
   });
   loader.present()
    this.navCtrl.setRoot(HomePage);
  }
  getMyEvents() {
    var itemsRef = firebase.database().ref('/events/');
    this.eventList = [];
      firebase.database().ref('/events/').once('value', (snapshot) => {
      let users = [];
      snapshot.forEach( snap => {
        var temp = snap.val();
        var groupMembersIDs = snap.child('members').val();
        var currentUserId = firebase.auth().currentUser.uid;
        if(currentUserId in groupMembersIDs) {
        temp.key = snap.key;
        this.eventList.push(temp);
      }
      return false;
     //or snap.val().name if you just want the name and not the whole object
      });
    });
  }

  getPublicEvents() {
    var itemsRef = firebase.database().ref('/events/');
    this.eventList = [];
      firebase.database().ref('/events/').once('value', (snapshot) => {
      let users = [];
      snapshot.forEach( snap => {
        var temp = snap.val();
        var publicValue = snap.child('public').val();
        var groupMembersIDs = snap.child('members').val();
        var currentUserId = firebase.auth().currentUser.uid;
        if(publicValue) {
          temp.key = snap.key;
          this.eventList.push(temp);
        }
        else{
        if(currentUserId in groupMembersIDs) {
        temp.key = snap.key;
        this.eventList.push(temp);
      }
    }
        return false; //or snap.val().name if you just want the name and not the whole object
      });
    });
  }
}
