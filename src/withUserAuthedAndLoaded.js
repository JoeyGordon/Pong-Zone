import React from 'react';
import PropTypes from 'prop-types';
import { firebase, auth, db } from './firebase';
import * as userActions from './actions/user';

// import * as userService from './services/user';

const withUserAuthedAndLoaded = (Component) => {
    class WithUserAuthedAndLoaded extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                authUser: null,
                user: null,
            };
        }

        getChildContext() {
            return {
                authUser: this.state.authUser,
                user: this.state.user,
            }
        }

        createUserRecord(user) {
            db.collection('users').add(user)
                .then(function (docRef) {
                    console.log("New User document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding user document: ", error);
                });
        }

        componentDidMount() {
            const { dispatch } = this.props

            auth.getRedirectResult()
            .then(result => {
                if (result.credential && result.additionalUserInfo.isNewUser) {
                    // TODO: move to models?
                    const newUser = {
                        createdDate: new Date(),
                        matches: {},
                        rating: 0,
                        wins: 0,
                        losses: 0,
                        name: result.user.displayName,
                        email: result.user.email,
                        photoURL: result.user.photoURL,
                    }
                    this.createUserRecord(newUser);
                }
            }).catch(function (error) {
                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // // The email of the user's account used.
                // var email = error.email;
                // // The firebase.auth.AuthCredential type that was used.
                // var credential = error.credential;
            });

            firebase.auth().onAuthStateChanged(authUser=> {
                if (authUser) {
                    console.log("User is authed and signed in: ", authUser);

                    
                    // go fetch the user data from firebase and set the user
                    const fetchedUser = db.collection('users').where('email', '==', authUser.email);
                    dispatch(userActions.setUser(fetchedUser));

                }
            });

            // const db = firebase.database();
            // this.setAuthUserAndLoadUserInfo = (authUser) => {
            //     console.log('authUser', authUser);
            //     // const testUser = userService.getUserByEmail(authUser.email);

            //     db.ref('users').orderByChild('email').equalTo(authUser.email).on('value', (snapshot) => {
            //         this.setState(() => ({ authUser, user: snapshot.val() }));
            //     });
            // }


            // auth.onAuthStateChanged(authUser => {
            //     authUser
            //         ? this.setAuthUserAndLoadUserInfo(authUser)
            //         : this.setState(() => ({ authUser: null, user: null, }));
            // });
        }

        render() {
            return (
                <Component />
            );
        }
    }

    WithUserAuthedAndLoaded.childContextTypes = {
        authUser: PropTypes.object,
        user: PropTypes.object,
    };

    return WithUserAuthedAndLoaded;
}

export default withUserAuthedAndLoaded;