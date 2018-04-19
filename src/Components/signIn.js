import React, { Component } from 'react';

import {provider} from '../firebase';
import * as auth from '../auth';

class SignInForm extends Component {
    googleLogin() {
        auth.signInWithRedirect(provider);
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
