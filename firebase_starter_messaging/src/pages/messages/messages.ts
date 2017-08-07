import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { Login } from '../login/login';
import { MessagesPageAdd } from '../messagesadd/messagesadd';
import { ContactPage } from '../contact/contact';
import firebase from 'firebase';
import { MessagesPageView } from '../messagesview/messagesview';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {
private conversationList: Array<any>;
private conversationIDList: Array<any>;
private recieverInfo: Array<any>;
private recievers;

    constructor(public navCtrl: NavController, public authData: AuthData) {
          this.conversationList = [];
          this.conversationIDList = [];

          firebase.database().ref('/convos/').once('value', (snapshot) => {
            snapshot.forEach(snap => {
              var temp = snap.val();
              var members = Object.keys(temp.members);
              for(var i = 0; i < members.length; i++) {
                var memberid = members[i];
                var isActive = temp.members[memberid];
                debugger;
                if(members[i] == firebase.auth().currentUser.uid && isActive) {
                  temp.key = snap.key;
                  members.splice(i, 1);
                  temp.members = members[0];
                  this.conversationIDList.push(temp);
                }
              }
              return false;
            })
                this.getConvoList();
          })

  }

  logOut() {
      this.authData.logoutUser().then(() => {
          this.navCtrl.setRoot(Login);
      });
  }
  addConvo(){
    this.navCtrl.push(MessagesPageAdd);
  }
  archive(key: string){
    var currentUser = firebase.auth().currentUser.uid;
    firebase.database().ref('/convos/'+ key + '/members/').update({
        [currentUser] : false
    })
  this.navCtrl.setRoot(this.navCtrl.getActive().component);
}

  getConvoList() {
    for(let convo of this.conversationIDList) {
        var temp;
        this.recievers = {};
        var userProfileRef = firebase.database().ref('/userProfile/' + convo.members)
          userProfileRef.once('value', (snapshot) =>{

            this.recievers[convo.key] = snapshot.val();

            temp = snapshot.val();
            temp.key = convo.key;
            temp.newest =  convo.newest;
            temp.recieverInfo = convo.members;
            this.conversationList.push(temp);
          })

      }

  }
  goToSettings() {
          this.navCtrl.push(ContactPage);
  }
  getRecieverInfo(key: string){
    this.recieverInfo = [];
    this.recieverInfo.push(this.recievers[key]);
    debugger;
  }
  goToConvoDetail(key: string, info: string){
    var convoKey = key;
    this.getRecieverInfo(convoKey);
    var recieverInfo = this.recieverInfo;
    debugger;
    this.navCtrl.push(MessagesPageView,{
       convoKey,
       recieverInfo
     });
  }
}
