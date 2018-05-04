import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as auth from '../auth';
import { provider } from '../firebase';

const MainMenu = (props) => {
    const googleLogin = (e) => {
        e.preventDefault();
        auth.signInWithRedirect(provider);
    }

    const isLoggedIn = Boolean(props.loggedInUser.userId);

    const submitMatchLink = isLoggedIn ?
        (
            <li>
                <NavLink to="/SubmitMatch" exact activeClassName="active">
                    <i className="fas fa-plus-square fa-2x"></i>
                    Submit Match
                </NavLink>
            </li>
        ) :
        null;

    const loginBlock = isLoggedIn ?
        (
            <li>
                <button onClick={auth.doSignOut} className="sign-out-button">Sign Out</button>
            </li>
        ) :
        (
            <li>
                <a onClick={(e) => googleLogin(e)} href="">
                    <i className="fas fa-user fa-2x"></i>
                    Login
                </a>
            </li>
        )


    // const photoBlock = isLoggedIn ? <img className="logged-in-user-photo" src={props.loggedInUser.photoURL} alt="" /> : null;

    return (
        <div className="menu-bar">
            <h1>Pong Zone</h1>

            <ul className="primary-menu">
                <li>
                    <NavLink to="/" exact activeClassName="active">
                        <i className="fas fa-trophy fa-2x"></i>
                        Leaderboard
                        </NavLink>
                </li>
                {submitMatchLink}
                <li>
                    <NavLink to="/history" exact activeClassName="active">
                        <i className="fas fa-list fa-2x"></i>
                        Match History
                        </NavLink>
                </li>
                {/* {loginBlock} */}
            </ul>
        </div>
    )
}

const mapStateToProps = state => ({
    loggedInUser: state.user
});

export default withRouter(connect(mapStateToProps)(MainMenu));