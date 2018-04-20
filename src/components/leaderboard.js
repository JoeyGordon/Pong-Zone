import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Leaderboard = (props) => {
  const sortedUsersByRating = _.orderBy(props.users, 'rating', 'desc');

  const usersList = sortedUsersByRating.map(user => {
    return (
      <li key={user.userId}>
        <h3>{user.name} ({user.rating})</h3>
        <img src={user.photoURL} alt="" />
      </li>
    )
  });

  return (
    <LeaderboardWrapper>
      <h1>Leaderboard</h1>
      <ul>
        {usersList}
      </ul>
    </LeaderboardWrapper>
  )
}

Leaderboard.contextTypes = {
  users: PropTypes.array,
};

const mapStateToProps = state => ({
  users: state.users
});

const LeaderboardWrapper = styled.div`
  img {
    width: 80px;
    height; auto;
    border-radius: 50%;
  }  
`;

export default connect(mapStateToProps)(Leaderboard);