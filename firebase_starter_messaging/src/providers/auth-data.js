var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import firebase from 'firebase';
var AuthData = (function () {
    function AuthData() {
    }
    /**
     * [loginUser We'll take an email and password and log the user into the firebase app]
     * @param  {string} email    [User's email address]
     * @param  {string} password [User's password]
     */
    AuthData.prototype.loginUser = function (email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    };
    /**
     * [signupUser description]
     * This function will take the user's email and password and create a new account on the Firebase app, once it does
     * it's going to log the user in and create a node on userProfile/uid with the user's email address, you can use
     * that node to store the profile information.
     * @param  {string} email    [User's email address]
     * @param  {string} password [User's password]
     */
    AuthData.prototype.signupUser = function (email, password, name) {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then(function (newUser) {
            // firebase.database().ref('/users').child(email).set({
            //    firstName: "anonymous",
            //   id:newUser.uid,
            // });
            firebase.database().ref('/userProfile').child(newUser.uid).set({
                displayName: name,
                photoURL: "https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg",
                email: email
            });
            newUser.updateProfile({
                displayName: name,
                photoURL: "https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg"
            });
        });
    };
    /**
     * [resetPassword description]
     * This function will take the user's email address and send a password reset link, then Firebase will handle the
     * email reset part, you won't have to do anything else.
     *
     * @param  {string} email    [User's email address]
     */
    AuthData.prototype.resetPassword = function (email) {
        return firebase.auth().sendPasswordResetEmail(email);
    };
    /**
     * This function doesn't take any params, it just logs the current user out of the app.
     */
    AuthData.prototype.logoutUser = function () {
        return firebase.auth().signOut();
    };
    return AuthData;
}());
AuthData = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], AuthData);
export { AuthData };
//# sourceMappingURL=auth-data.js.map