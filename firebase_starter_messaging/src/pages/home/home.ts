import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { SettingsPage } from '../settingsPage/settingsPage';
import { GroupsPageDetails } from '../groupsdetail/groupsdetail';
import firebase from 'firebase';
import { AboutPageDetail } from '../aboutdetail/aboutdetail';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
public groupList: Array<any>;
 private eventList: Array<any>;
    constructor(public navCtrl: NavController, public authData: AuthData, public loadingCtrl: LoadingController) {
      var itemsRef = firebase.database().ref('/groups/');
         this.groupList = []
           firebase.database().ref('/groups/').once('value', (snapshot) => {
           let users = [];
           snapshot.forEach( snap => {
             var groupMembersIDs = snap.child('members').val();
             var currentUserId = firebase.auth().currentUser.uid;
             var publicValue = snap.child('public').val();
             if(publicValue) {
               var temp = snap.val();
               temp.key = snap.key;
               this.groupList.push(temp);
               }
             else{
             if(currentUserId in groupMembersIDs) {
             var temp = snap.val();
             temp.key = snap.key;
             this.groupList.push(temp);
           }
         }
             return false; //or snap.val().name if you just want the name and not the whole object
           });
         });

         this.getPublicEvents();
  }
  goToSettings() {
          this.navCtrl.push(ContactPage);
  }
  goToGroupDetail(id: string) {
     this.navCtrl.push(GroupsPageDetails,{
      paramId: id
    });
  }
  archiveGroup(key: string) {
    var event = firebase.database().ref('/groups/' + key);
    event.remove();

    let loader = this.loadingCtrl.create({
     content: "Deleting Group...",
     duration: 3000
   });
   loader.present()
    this.navCtrl.setRoot(HomePage);

  }

  goToEventDetail(id: string) {
     this.navCtrl.push(AboutPageDetail,{
      paramId: id
    });
  }

  archiveEvent(key: string) {
    var event = firebase.database().ref('/events/' + key);
    event.remove();

    let loader = this.loadingCtrl.create({
     content: "Deleting Event...",
     duration: 3000
   });
   loader.present()
    this.navCtrl.setRoot(HomePage);
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
