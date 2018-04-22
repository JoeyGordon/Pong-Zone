import React from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';

import * as routes from '../constants/routes';
import * as auth from '../auth';
import { provider } from '../firebase';

import Leaderboard from './leaderboard';
import History from './history';
import SignIn from './signIn';
import SubmitMatch from "./submitMatch";

const MainLayout = (props) => {
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

    const photoBlock = isLoggedIn ? <img className="logged-in-user-photo" src={props.loggedInUser.photoURL} alt="" /> : null;

    return (
        <MainLayoutWrapper>
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
                    {loginBlock}
                </ul>
                {photoBlock}
            </div>

            <div className="main-content">
                <Route exact path={routes.LEADERBOARD} component={() => <Leaderboard />} />
                <Route exact path={routes.SUBMIT_MATCH} component={() => <SubmitMatch />} />
                <Route exact path={routes.HISTORY} component={() => <History />} />
                <Route exact path={routes.SIGN_IN} component={() => <SignIn />} />
            </div>
        </MainLayoutWrapper>
    )
};

MainLayout.propTypes = {
};

const mapStateToProps = state => ({
  loggedInUser: state.user
});

const MainLayoutWrapper = styled.div`
  min-height: 100%;

  h1 {
    margin: 0px;
    padding: 0px;
    font-weight: 100;
    font-size: 20px;
  }

  .menu-bar {
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    background: #011627;
    width: 100%;
    padding: 1em;
    color: #fff;
    z-index: 5;
  }

  .menu-bar h1 {
      display: none;
  }

  .menu-bar ul {
    display: flex;
    justify-content: space-between;
    padding: 0;
    margin: 0;
    width: 100%;
  }

  .menu-bar li {
    display: block;
    list-style: none;
    text-align: center;
    font-size: 0.8em;
  }

  .menu-bar li svg {
      display: block;
      margin: 0 auto 0.2em;
  }

  .menu-bar a {
    color: #fff;
    text-decoration: none;
  }

  .menu-bar a:hover {
    color: #FCD581;
  }

  .menu-bar a.active {
    color: #FCD581;
  }

  .menu-bar img {
    margin-left: auto;
    max-height: 60%;
    width: auto;
    border-radius: 50%;
  }

  .main-content {
  }

  .logged-in-user-photo {
      height: 3em;
      width: auto;
  }
`;

export default withRouter(connect(mapStateToProps)(MainLayout));
