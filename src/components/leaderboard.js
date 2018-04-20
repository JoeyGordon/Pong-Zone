import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Leaderboard = (props) => {
  const sortedUsersByRating = _.orderBy(props.users, 'rating', 'desc');

  const usersList = sortedUsersByRating.map(user => {
    const currentUserClass = user.userId === props.loggedInUser.userId ?
      "current-user" :
      null;
    return (
      <li key={user.userId} className={currentUserClass}>
        <h3>{user.name} ({user.rating})</h3>
        <img src={user.photoURL} alt="" />
      </li>
    )
  });

  return (
    <LeaderboardWrapper>
      <h1>Leaderboard</h1>
      <ol>
        {usersList}
      </ol>
    </LeaderboardWrapper>
  )
}

Leaderboard.contextTypes = {
  users: PropTypes.array,
};

const mapStateToProps = state => ({
  users: state.users,
  loggedInUser: state.user,
});

const LeaderboardWrapper = styled.div`
  .current-user {
    background: goldenrod;
  }

  img {
    width: 80px;
    height: auto;
    border-radius: 50%;
  }
`;

export default connect(mapStateToProps)(Leaderboard);