import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { Login } from '../login/login';
import { MessagesPageView } from '../messagesview/messagesview';
import { MessagesPage} from '../messages/messages';

import firebase from 'firebase';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-messagesdraft',
  templateUrl: 'messagesdraft.html'
})
export class MessagesPageDraft {
  recieverInfo: Array<any>;
  public addMessage;
    constructor(public navCtrl: NavController, public authData: AuthData,  public navParams: NavParams, public formBuilder: FormBuilder) {
      this.recieverInfo =[]
      this.addMessage = formBuilder.group({
           message: ['']
        })
        firebase.database().ref('/userProfile/'+ this.navParams.get('paramId')).once('value', (snapshot) =>{
          var  temp = snapshot.val();
          this.recieverInfo.push(snapshot.val());
        });
  }

send(){
  var convo = firebase.database().ref('/convos/').push();
  var messageRef = firebase.database().ref('/convos/' + convo.key);
  var currentID = firebase.auth().currentUser.uid
  var message = this.addMessage.value.message
  var newest = {}
  newest['newest'] = message;

  messageRef.set({
    members: {[currentID] : true,
              [this.navParams.get('paramId')] : true},
  });
messageRef.update(newest);


messageRef = firebase.database().ref('/convos/' + convo.key + '/messages').push();
var timestamp = new Date().getTime();
var updatedObj = {};
updatedObj['sender'] = currentID;
updatedObj['message'] = message;
updatedObj['time'] = timestamp;
  messageRef.update(updatedObj)

var convoKey = convo.key;
var recieverInfo = this.recieverInfo;
this.navCtrl.setRoot(MessagesPageView,{
   convoKey,
   recieverInfo
 });
}
goToMessages(){
  this.navCtrl.setRoot(MessagesPage);
}
}
