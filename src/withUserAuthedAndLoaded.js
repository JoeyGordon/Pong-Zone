import React from 'react';
import PropTypes from 'prop-types';
import { firebase, auth } from './firebase';

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

        componentDidMount() {

            auth.getRedirectResult()
            .then(result => {
                if (result.credential && result.additionalUserInfo.isNewUser) {
                    const newUser = {
                        createdDate: new Date(),
                        matches: {},
                        rating: 0,
                        wins: 0,
                        losses: 0,
                        name: result.user.displayName,
                        email: result.user.email,
                        photoUrl: result.user.photoURL,
                    }
                    this.createUserRecord(newUser);
                    console.log(result)
                }
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });

            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    console.log("User signed in: ", user);
                    // this.setAuthUserAndLoadUserInfo(authUser)
                } 
            });
            const db = firebase.database();
            this.setAuthUserAndLoadUserInfo = (authUser) => {
                console.log('authUser', authUser);
                // const testUser = userService.getUserByEmail(authUser.email);

                db.ref('users').orderByChild('email').equalTo(authUser.email).on('value', (snapshot) => {
                    this.setState(() => ({ authUser, user: snapshot.val() }));
                });
            }


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