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
`;

export default withRouter(connect(mapStateToProps)(MainLayout));
