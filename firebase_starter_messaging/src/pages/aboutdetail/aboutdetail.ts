import { Component } from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { Login } from '../login/login';
import { AboutPage } from '../about/about';
import { AboutPageAdd } from '../aboutadd/aboutadd';
import firebase from 'firebase';

@Component({
  selector: 'page-aboutdetail',
  templateUrl: 'aboutdetail.html'
})
export class AboutPageDetail {
 public currentEvent: any;
 public inviteMembers: any;
 public tempInviteMembers: any;

  public userProfileRef:firebase.database.Reference;
  public itemsRef;
  public eventList;
  constructor(public navCtrl: NavController, public authData: AuthData,  public navParams: NavParams) {
    this.currentEvent = [];
    this.inviteMembers = [];
      firebase.database().ref('/events/' + this.navParams.get('paramId')).once('value', (snapshot) => {
          this.currentEvent.push(snapshot.val());
          this.getGoing();
          return false; //or snap.val().name if you just want the name and not the whole object
        });
  }
   logOut() {
      this.authData.logoutUser().then(() => {
          this.navCtrl.setRoot(Login);
      });
  }
  addEvent() {
    this.navCtrl.setRoot(AboutPageAdd);
  }
  getEventDetail(eventId:string): firebase.database.Reference {
    return this.userProfileRef.child('/events/').child(eventId);
  }
  getUsers(type: string) {
      this.inviteMembers = [];
      firebase.database().ref('/events/' + this.navParams.get('paramId') + '/' + type).once('value', (snapshot) => {
      snapshot.forEach( snap => {
        var groupMembersID = snap.key;
       firebase.database().ref('/userProfile/' + groupMembersID).once('value', (snapshot) => {
          this.inviteMembers.push(snapshot.val());
        });
        return false; //or snap.val().name if you just want the name and not the whole object
      });
      return false;
      });
  }
  setUserStatus(newStatus: string) {

      this.tempInviteMembers = [];
      var inviteTypes = ['going', 'maybe', 'notGoing', 'invited']
      firebase.database().ref('/events/' + this.navParams.get('paramId') + '/' + newStatus).set({
        [firebase.auth().currentUser.uid]: true

      })
      for(var i = 0; i < inviteTypes.length; i++){
      firebase.database().ref('/events/' + this.navParams.get('paramId') + '/' + inviteTypes[i]).once('value', (snapshot) => {
        snapshot.forEach( snap => {
        if(inviteTypes[i] != newStatus && firebase.auth().currentUser.uid == snap.key){
            firebase.database()
            snap.ref.remove();
        }
        return false;
      });
});
  }
}

  getGoing(){
    this.getUsers('going');
  }
  getMaybe() {
    this.getUsers('maybe');
  }
  getNotGoing(){
    this.getUsers('notGoing');
  }
  getInvited(){
    this.getUsers('invited');
  }

  setGoing(){
    this.setUserStatus('going');
  }
  setMaybe() {
    this.setUserStatus('maybe');
  }
  setNotGoing(){
    this.setUserStatus('notGoing');
  }
  setInvited(){
    this.setUserStatus('invited');
  }


}
