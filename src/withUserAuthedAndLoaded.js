import React from 'react';
import PropTypes from 'prop-types';
import { firebase, auth } from './firebase';

import * as userService from './Services/user';

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
            const db = firebase.database();
            this.setAuthUserAndLoadUserInfo = (authUser) => {
                console.log('authUser', authUser);
                // const testUser = userService.getUserByEmail(authUser.email);

                db.ref('users').orderByChild('email').equalTo(authUser.email).on('value', (snapshot) => {
                    this.setState(() => ({ authUser, user: snapshot.val() }));
                });
            }


            auth.onAuthStateChanged(authUser => {
                authUser
                    ? this.setAuthUserAndLoadUserInfo(authUser)
                    : this.setState(() => ({ authUser: null, user: null, }));
            });
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