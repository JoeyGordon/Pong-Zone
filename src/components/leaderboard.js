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
            <img src={user.photoURL} alt="" />
            <h3>{user.name}</h3>
            <span className="user-rating">{user.rating}</span>
          </li>
        </a>
      )
    });

    return (
      <LeaderboardWrapper>
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
  ol {
    margin: 0px;
    padding: 0px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ol li {
    display: flex;
    align-items: center;
    list-style: none;
    background: white;
    border-bottom: 2px solid #EEEEEE;
    margin: 0 0 0.5em 0;
    padding: 1em;
  }

  .selected-user{
    background: #FFF8E8;
  }

  li h3{
    margin: 0;
    padding: 0;
  }

  img {
    flex-grow: 0;
    height: 40px;
    width: auto;
    margin-right: 1em;
    border-radius: 50%;
  }

  .user-rating {
    display: block;
    margin-left: auto;
    font-weight: bold;
    font-size: 1.5em;
  }
`;

export default connect(mapStateToProps)(Leaderboard);