import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { SettingsPage } from '../settingsPage/settingsPage';
import { GroupsPageAdd } from '../groupsadd/groupsadd';
import { HomePage } from '../home/home';
import { GroupsPageDetails } from '../groupsdetail/groupsdetail';
import { ContactPage } from '../contact/contact';
import firebase from 'firebase';

@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html'
})
export class GroupsPage {
public eventList: Array<any>;
 public userProfileRef:firebase.database.Reference;
 public itemsRef;
    constructor(public navCtrl: NavController, public authData: AuthData, public loadingCtrl: LoadingController) {
 var itemsRef = firebase.database().ref('/groups/');
    this.eventList = []
      firebase.database().ref('/groups/').once('value', (snapshot) => {
      let users = [];
      snapshot.forEach( snap => {
        var groupMembersIDs = snap.child('members').val();
        var currentUserId = firebase.auth().currentUser.uid;
        var publicValue = snap.child('public').val();
        if(publicValue) {
          var temp = snap.val();
          temp.key = snap.key;
          this.eventList.push(temp);
          }
        else{
        if(currentUserId in groupMembersIDs) {
        var temp = snap.val();
        temp.key = snap.key;
        this.eventList.push(temp);
      }
    }
        return false; //or snap.val().name if you just want the name and not the whole object
      });
    });
  }
  goToSettings() {
          this.navCtrl.push(ContactPage);
  }
addGroup() {
    this.navCtrl.push(GroupsPageAdd);
  }

getEventDetail(id: string){
    return this.itemsRef = firebase.database().ref('/groups/' + id);
  }
  goToEventDetail(id: string) {
     this.navCtrl.push(GroupsPageDetails,{
      paramId: id
    });
  }
  archive(key: string) {
    var event = firebase.database().ref('/groups/' + key);
    event.remove();

    let loader = this.loadingCtrl.create({
     content: "Deleting Group...",
     duration: 3000
   });
   loader.present()
    this.navCtrl.setRoot(HomePage);

  }
}
