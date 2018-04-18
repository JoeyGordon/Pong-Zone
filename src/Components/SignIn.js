import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {provider} from '../firebase';
import * as auth from '../auth';
import * as routes from '../Constants/routes';

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

    onSubmit = (event) => {
        const {
            email,
            password,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE }));
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    }

    googleLogin = () => {
        auth.signInWithRedirect(provider);
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