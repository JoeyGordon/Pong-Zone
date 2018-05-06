import * as React from 'react';
import * as PropTypes from 'prop-types';
import { firebase, auth, db } from './firebase';
import * as userActions from './actions/user';
import * as loadingActions from './actions/loading';
import User from './models/user';
import * as utils from './utils/utils';

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
            // dispatch to set user in redux state

            // now persist the user
            const newUserRecord = utils.createFirebaseGeneric(user);
            db.collection('users').add(newUserRecord)
                .then(function (docRef) {
                    console.log("New User document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding user document: ", error);
                });
        }

        getUserRecordByEmail(email) {
            // 
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
            dispatch(loadingActions.startLoading());

            auth.getRedirectResult()
            .then(result => {
                if (result.credential && result.additionalUserInfo.isNewUser) {
                    this.createUserRecord(new User(result.user))
                }
            }).catch(function (error) {
                throw error;
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

            dispatch(loadingActions.stopLoading());
        }

        render() {
            return (
                <Component dispatch={this.props.dispatch} loading={this.props.loading}/>
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