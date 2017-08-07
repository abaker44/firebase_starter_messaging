import { Component } from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { Login } from '../login/login';
import firebase from 'firebase';

@Component({
  selector: 'page-groupsdetail',
  templateUrl: 'groupsdetail.html'
})
export class GroupsPageDetails {
 public currentGroup: any;
 public groupMembers:any;
  public userProfileRef:firebase.database.Reference;
  public itemsRef;
  public eventList;
  constructor(public navCtrl: NavController, public authData: AuthData,  public navParams: NavParams) {
    this.currentGroup = [];
    this.groupMembers = [];
      firebase.database().ref('/groups/' + this.navParams.get('paramId')).once('value', (snapshot) => {
          this.currentGroup.push(snapshot.val());

          firebase.database().ref('/groups/' + this.navParams.get('paramId') + '/members').once('value', (snapshot) => {
          snapshot.forEach( snap => {
            var groupMembersID = snap.key;
           firebase.database().ref('/userProfile/' + groupMembersID).once('value', (snapshot) => {
              this.groupMembers.push(snapshot.val());
            });
            return false; //or snap.val().name if you just want the name and not the whole object
          });
          return false;
          });
          return false;
        });

  }
   logOut() {
      this.authData.logoutUser().then(() => {
          this.navCtrl.setRoot(Login);
      });
  }
  getEventDetail(eventId:string): firebase.database.Reference {
    return this.userProfileRef.child('/groups/').child(eventId);
  }
  getGroupMembers() {

  }

}
