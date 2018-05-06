import * as React from 'react';
import * as PropTypes from "prop-types";
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './app.css';
import { db } from './firebase';
import LoadingScreen from './components/loadingScreen';
import MainLayout from './components/mainLayout';
import ScrollToTop from './scrollToTop';
import withUserAuthedAndLoaded from './withUserAuthedAndLoaded';
import * as usersActions from './actions/users';
import * as matchesActions from './actions/matches';
import * as teamsActions from './actions/teams';
import * as loadingActions from './actions/loading';

const MAX_MATCHES_RECORDS = 100;

type Props = {
  dispatch: Function,
  loading: Object,
};

class App extends React.Component<Props> {
  componentWillMount() {
    this.props.dispatch(loadingActions.startLoading());
    // setup users listener and populate redux with full collection
    db.collection('users')
      .onSnapshot(users => {
        const usersArray = [];
        users.forEach(user => {
          const userDetails = user.data();
          userDetails.userId = user.id;
          usersArray.push(userDetails);
        });
        this.props.dispatch(usersActions.setAllUsers(usersArray));
        this.props.dispatch(loadingActions.stopLoading());
      });

    this.props.dispatch(loadingActions.startLoading());
    // setup matches listener and populate redux with last 100 records
    db.collection('matches').orderBy('matchDate', 'desc').limit(MAX_MATCHES_RECORDS)
      .onSnapshot(matches => {
        const matchesArray = [];
        matches.forEach(match => {
          const matchDetails = match.data();
          matchDetails.matchId = match.id;
          matchesArray.push(matchDetails);
        });
        this.props.dispatch(matchesActions.setMatches(matchesArray));
        this.props.dispatch(loadingActions.stopLoading());
      });

    this.props.dispatch(loadingActions.startLoading());
    // set up teams listener and populate redux with the full collection
    db.collection('teams')
      .onSnapshot(teams => {
        const teamsArray = [];
        teams.forEach(team => {
          const teamDetails = team.data();
          teamDetails.teamId = team.id;
          teamsArray.push(teamDetails);
        });
        this.props.dispatch(teamsActions.setAllTeams(teamsArray));
        this.props.dispatch(loadingActions.stopLoading());
      });
  };

  render() {
    if ((this.props.loading as any).isLoading) {
      return <LoadingScreen />
    }
    return (
      <Router>
        <ScrollToTop>
          <MainLayout />
        </ScrollToTop>
      </Router>
    );
  }
}

const mapStateToProps: any = state => ({
  loading: state.loading
});

export default connect(mapStateToProps)(withUserAuthedAndLoaded(App));
