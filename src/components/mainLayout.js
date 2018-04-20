import React from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';

import * as routes from '../constants/routes';
import * as auth from '../auth';

import Leaderboard from './leaderboard';
import History from './history';
import SignIn from './signIn';
import SubmitMatch from "./submitMatch";

const MainLayout = (props) => {
    const isLoggedIn = Boolean(props.loggedInUser.userId);

    const submitMatchLink = isLoggedIn ?
        (
            <li>
                <NavLink to="/SubmitMatch" exact activeClassName="active">
                    Submit Match
                </NavLink>
            </li>
        ) : 
        null;

    const loginBlock = isLoggedIn ?
        (
            <li>
                <button onClick={auth.doSignOut}>Sign Out</button>
            </li>
        ) :
        (
            <li>
                <NavLink to="/SignIn" exact activeClassName="active">
                    Login
                </NavLink>
            </li>
        )

    const photoBlock = isLoggedIn ? <img src={props.loggedInUser.photoURL} alt="" /> : null;

    return (
        <MainLayoutWrapper>
            <div className="sidebar">
                <h1>Pong Zone</h1>

                <ul className="primary-menu">
                    <li>
                        <NavLink to="/" exact activeClassName="active">
                            Leaderboard
                        </NavLink>
                    </li>
                    {submitMatchLink}
                    <li>
                        <NavLink to="/history" exact activeClassName="active">
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
  display: flex;
  min-height: 100%;

  h1 {
    display: inline-block;
    font-size: 30px;
    margin: 0 1em 0 0;
    font-weight: 100;
  }

  .sidebar {
    display: flex;
    align-items: center;
    position: fixed;
    background: #191919;
    width: 100%;
    height: 64px;
    padding: 0 2em;
    color: #fff;
    z-index: 2;
  }

  .sidebar ul {
    display: inline-block;
    padding: 0;
    margin: 0;
  }

  .sidebar li {
    display: inline-block;
    list-style: none;
    margin: 0 1.5em 0;
  }

  .sidebar a {
    color: #fff;
    text-decoration: none;
  }

  .sidebar a:hover {
    color: #e53935;
  }

  .sidebar a.active {
    color: #e53935;
  }

  .sidebar img {
    margin-left: auto;
    max-height: 60%;
    width: auto;
    border-radius: 50%;
  }

  .main-content {
    padding: 2em;
    margin-top: 60px;
    flex-grow: 1;
  }
`;

export default withRouter(connect(mapStateToProps)(MainLayout));
