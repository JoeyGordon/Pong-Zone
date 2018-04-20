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

        getUserRecordByEmail(email) {
            const fetchUserQuery = db.collection('users').where('email', '==', email);
            return fetchUserQuery.get().then(response => {
                if(response.docs.length > 1){
                    throw new Error('More than one user returned for email');
                }
                const user = response.docs[0].data();
                user.id = response.docs[0].id;
                return user;
            })
        }

        componentDidMount() {
            const { dispatch } = this.props

            auth.getRedirectResult()
            .then(result => {
                if (result.credential && result.additionalUserInfo.isNewUser) {
                    // TODO: move to models?
                    const newUser = {
                        createdDate: new Date(),
                        matches: [],
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
                    this.getUserRecordByEmail(authUser.email).then(user => {
                        dispatch(userActions.setUser(user));
                    });
                }else{
                    dispatch(userActions.logOutUser());
                }
            });
        }

        render() {
            return (
                <Component dispatch={this.props.dispatch}/>
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