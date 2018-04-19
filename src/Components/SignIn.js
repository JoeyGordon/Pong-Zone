import React, { Component } from 'react';

import {firebase, db, provider} from '../firebase';
import * as auth from '../auth';

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.createUserRecord = this.createUserRecord.bind(this);
    }

    googleLogin() {
        auth.signInWithRedirect(provider);
    }

    createUserRecord(user) {
        // console.log("HEY", user)
        db.collection('users').add(user)
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }

    componentWillMount() {
        console.log("HEY THERE")
        // firebase.auth().onAuthStateChanged(user => {
        //     if (user) {
        //         console.log("User signed in: ", user);
        //     }
        // });

        // auth.getRedirectResult()
        // .then(result => {
        //     if (result.credential && result.additionalUserInfo.isNewUser) {
        //         const newUser = {
        //             createdDate: new Date(),
        //             matches: {},
        //             rating: 0,
        //             wins: 0,
        //             losses: 0,
        //             name: result.user.displayName,
        //             email: result.user.email,
        //             photoUrl: result.user.photoURL,
        //         }
        //         this.createUserRecord(newUser);
        //         console.log(result)
        //     }
        // }).catch(function (error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // The email of the user's account used.
        //     var email = error.email;
        //     // The firebase.auth.AuthCredential type that was used.
        //     var credential = error.credential;
        //     // ...
        // });

    }

    render() {
        return (
            <div>
                <h1>SignIn</h1>
                <button onClick={this.googleLogin}>Google Sign-In</button>
            </div>
        );
    }
}

export default SignInForm;