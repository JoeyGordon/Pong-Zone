import * as React from 'react';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';

import * as routes from '../constants/routes';

import Leaderboard from './leaderboard';
import History from './history';
import SignIn from './signIn';
import SubmitMatch from './submitMatch';
import MainMenu from './mainMenu';
import User from '../models/user';
import { RootState } from '../rootReducer';

export interface MainLayoutProps {
    loggedInUser: User
}

class MainLayout extends React.Component<MainLayoutProps & RouteComponentProps<{}>> {
    render() {
        return (
            <MainLayoutWrapper>
                <MainMenu />

                <div className="main-content">
                    <Route exact path={routes.LEADERBOARD} component={() => <Leaderboard />} />
                    <Route exact path={routes.SUBMIT_MATCH} component={() => <SubmitMatch />} />
                    <Route exact path={routes.HISTORY} component={() => <History />} />
                    <Route exact path={routes.SIGN_IN} component={() => <SignIn />} />
                </div>
            </MainLayoutWrapper>
        )
    }
};

const mapStateToProps = (state: RootState): MainLayoutProps => ({
    loggedInUser: state.user
});

const MainLayoutWrapper = styled.div`
  min-height: 100%;
`;

export default withRouter(connect(mapStateToProps)(MainLayout));
