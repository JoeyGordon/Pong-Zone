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

class App extends Component {
  componentWillMount() {
    db.collection('users').get()
    .then(users => {
      const usersArray = [];
      users.forEach(user => {
        const userDetails = user.data();
        userDetails.userId = user.id;
        usersArray.push(userDetails);
      });
      this.props.dispatch(usersActions.setAllUsers(usersArray));
    })
  }

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
