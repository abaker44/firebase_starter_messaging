import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { Login } from '../login/login';
import { MessagesPage } from '../messages/messages';

import firebase from 'firebase';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-messagesview',
  templateUrl: 'messagesview.html'
})
export class MessagesPageView {
  searchQuery: string = '';
  items: Array<any>;
 private messageList: Array<any>;
  convoID: string;
  recieverInfo: Array<any>;
  public addMessage;
  currentUserID = firebase.auth().currentUser.uid;
    constructor(public navCtrl: NavController, public authData: AuthData,  public navParams: NavParams, public formBuilder: FormBuilder) {
      this.convoID = this.navParams.get('convoKey');
      this.messageList = [];
      this.addMessage = formBuilder.group({
          message: ['']
      })
        this.recieverInfo =[];
      firebase.database().ref('/convos/' + this.convoID + '/messages/').once('value', (snapshot) => {
      snapshot.forEach( snap => {

        firebase.database().ref('/userProfile/' + snap.val().sender).once('value', (usersnapshot) => {
          var temp = snap.val();
          debugger;
          temp.displayName =  usersnapshot.val().displayName;
          temp.photoURL =  usersnapshot.val().photoURL
          temp.key = snap.key;
        this.messageList.push(temp);
          this.sort()
      });

        return false;
        });
         //or snap.val().name if you just want the name and not the whole object
    });

    this.recieverInfo = this.navParams.get('recieverInfo');

}
update(){
  firebase.database().ref('/convos/' + this.convoID + '/messages/').once('value', (snapshot) => {
    snapshot.forEach(snap => {


      firebase.database().ref('/userProfile/' + snap.val().sender).once('value', (usersnapshot) => {
        var temp = snap.val();
        temp.displayName = usersnapshot.val().displayName;
        temp.photoURL = usersnapshot.val().photoURL;
        temp.key = snap.key;
        var exists = false;
        for(var i = 0; i < this.messageList.length; i++) {
          debugger;
          if(temp.key == this.messageList[i].key){
            exists = true;
          }
        }
        if(!exists) {
          this.messageList.push(temp);
        }

      })
        return false;
    })
  })
  this.sort()
}

sendMessage() {
    //   var message = this.addMessage.value.message
    //   var currentID = firebase.auth().currentUser.uid;
    //   var updatedObj = {};
    // updatedObj[currentID] = message;
    //   var messageRef = firebase.database().ref('/convos/' + this.convoID + '/messages');
    //     messageRef.update(updatedObj);
    var message = this.addMessage.value.message
    var currentID = firebase.auth().currentUser.uid;
    var timestamp = new Date().getTime();
    var convoKey = this.convoID
    var convoRef = firebase.database().ref('/convos/' + convoKey);
    var newest = {};
    newest['newest'] = message;
    // firebase.database().ref('/convos/' + convoKey + '/messages').set({'newest': [message]})
    var  messageRef = firebase.database().ref('/convos/' + convoKey + '/messages').push();
    var updatedObj = {};
    updatedObj['sender'] = currentID;
    updatedObj['message'] = message;
    updatedObj['time'] = timestamp;
      messageRef.update(updatedObj)
      convoRef.update(newest);
      this.addMessage = this.formBuilder.group({
          message: ['']
        });
      this.update()
}
goToMessages(){
  this.navCtrl.setRoot(MessagesPage);
}
sort(){
  this.messageList.sort(function(a, b) {
      var dateA = +new Date(a.time);
      var dateB = +new Date(b.time);
      return dateA - dateB
  });
}
convertTime(time: any){
  new Date(time * 1000)
}
}
