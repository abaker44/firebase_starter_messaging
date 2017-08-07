import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { Login } from '../login/login';
import { MessagesPageDraft } from '../messagesdraft/messagesdraft';

import firebase from 'firebase';

@Component({
  selector: 'page-messagesadd',
  templateUrl: 'messagesadd.html'
})
export class MessagesPageAdd {
  searchQuery: string = '';
  items: Array<any>;
  itemsList: Array<any>;
    constructor(public navCtrl: NavController, public authData: AuthData) {
      this.itemsList = []
      firebase.database().ref('/userProfile/').once('value', (snapshot) => {
      snapshot.forEach( snap => {

        var temp = snap.val();
        temp.key = snap.key;
        this.itemsList.push(temp);
        return false;
        });
         //or snap.val().name if you just want the name and not the whole object
    });
      this.initializeItems();
  }

  logOut() {
      this.authData.logoutUser().then(() => {
          this.navCtrl.setRoot(Login);
      });
  }
  initializeItems() {
    this.items = this.itemsList;

  }

  getItems(ev: any){
    // Reset items back to all of the items
   this.initializeItems();

   // set val to the value of the searchbar
   let val = ev.target.value;

   // if the value is an empty string don't filter the items
   if (val && val.trim() != '') {
     this.items = this.items.filter((item) => {
       return (item.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1);
     })
   }
 }
 makeDraft(id: string){
   this.navCtrl.push(MessagesPageDraft,{
      paramId: id
    });
 }
}
