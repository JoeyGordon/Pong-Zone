import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';

import * as routes from '../constants/routes';

import Leaderboard from './leaderboard';
import LeaderboardDoubles from './leaderboardDoubles';
import History from './history';
import SignIn from './signIn';
import SubmitMatch from './submitMatch';
import MainMenu from './mainMenu';

const MainLayout = (props) => {
    return (
        <MainLayoutWrapper>
            <MainMenu />

            <div className="main-content">
                <Route exact path={routes.LEADERBOARD} component={() => <Leaderboard />} />
                <Route exact path={routes.LEADERBOARDDOUBLES} component={() => <LeaderboardDoubles />} />
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

  .main-content {
  }
`;

export default withRouter(connect(mapStateToProps)(MainLayout));
