import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import UserProfile from './userProfile';

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: null,
    };
  }

  componentDidMount() {
    if (this.props.loggedInUser.userId) {
      this.setState({ selectedUser: this.props.loggedInUser });
    }
  }

  handleUserSelect(event, user) {
    event.preventDefault();
    this.setState({selectedUser: user});
  }

  render() {
    const { selectedUser } = this.state;

    const sortedUsersByRating = _.orderBy(this.props.users, 'rating', 'desc');

    const usersList = sortedUsersByRating.map(user => {
      const selectedUserClass = (selectedUser && user.userId === selectedUser.userId) ?
        "selected-user" :
        null;

      return (
        <a key={user.userId} href="" onClick={(e) => {this.handleUserSelect(e, user)}}>
          <li className={selectedUserClass}>
            <h3>{user.name} ({user.rating})</h3>
            <img src={user.photoURL} alt="" />
          </li>
        </a>
      )
    });

    return (
      <LeaderboardWrapper>
        <h1>Leaderboard</h1>
        <ol>
          {usersList}
        </ol>
        {(selectedUser && selectedUser.userId) && <UserProfile user={selectedUser} />}
      </LeaderboardWrapper>
    )
  }
}

Leaderboard.propTypes = {
  users: PropTypes.array,
  loggedInUser: PropTypes.object,
};

const mapStateToProps = state => ({
  users: state.users,
  loggedInUser: state.user,
});

const LeaderboardWrapper = styled.div`
  .selected-user{
    background: coral;
  }

  img {
    width: 80px;
    height: auto;
    border-radius: 50%;
  }
`;

export default connect(mapStateToProps)(Leaderboard);