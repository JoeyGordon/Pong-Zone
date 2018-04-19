import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {provider} from '../firebase';
import * as auth from '../auth';
import * as routes from '../constants/routes';

const SignInPage = ({ history }) =>
    <div>
        <h1>SignIn</h1>
        <SignInForm history={history} />
    </div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    googleLogin() {
        auth.signInWithRedirect(provider);
    }

    componentDidMount() {
        // auth.getRedirectResult().then(function (result) {
        //     if (result.credential) {
        //         // This gives you a Google Access Token. You can use it to access the Google API.
        //         var token = result.credential.accessToken;
        //         // ...
        //     }
        //     // The signed-in user info.
        //     var user = result.user;
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
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <div>
                <button onClick={this.googleLogin}>Google Sign-In</button>
            </div>
        );
    }
}

export default withRouter(SignInPage);

export {
    SignInForm,
};