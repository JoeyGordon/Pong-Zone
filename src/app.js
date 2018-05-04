import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import PropTypes from "prop-types";

import './app.css';
import { db } from './firebase';
import MainLayout from './components/mainLayout';
import ScrollToTop from './scrollToTop';
import withUserAuthedAndLoaded from './withUserAuthedAndLoaded';
import * as usersActions from './actions/users';
import * as matchesActions from './actions/matches';
import * as teamsActions from './actions/teams';

const MAX_MATCHES_RECORDS = 100;

class App extends Component {
  componentWillMount() {
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
    });
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
    });
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
    });
  };

  render() {
    return (
      <Router className="App">
        <ScrollToTop>
          <MainLayout />
        </ScrollToTop>
      </Router>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
}

export default connect()(withUserAuthedAndLoaded(App));
