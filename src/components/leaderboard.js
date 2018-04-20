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

    const usersList = sortedUsersByRating.map((user, index) => {
      const selectedUserClass = (selectedUser && user.userId === selectedUser.userId) ?
        "selected-user" :
        null;

      return (
        <a key={user.userId} href="" onClick={(e) => {this.handleUserSelect(e, user)}}>
          <li className={selectedUserClass}>
            <div className="user-rank">
              {index + 1}
            </div>
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
    ${'' /* padding: 1em; */}
  }

  .selected-user{
    background: #FCD581;
  }

  li h3{
    margin: 0;
    padding: 0;
  }

  img {
    background: #DDD;
    flex-grow: 0;
    height: 50px;
    min-width: 50px;
    width: auto;
    margin-right: 1em;
    ${'' /* border-radius: 50%; */}
  }

  .user-rank {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #B6C454;
    font-size: 1.5em;
    font-weight: bold;
    padding: 0 1em;
    height: 50px;
    width: 50px;
  }

  .user-rating {
    display: block;
    margin-left: auto;
    font-weight: bold;
    font-size: 1.5em;
    padding: 0 1em;
  }
`;

export default connect(mapStateToProps)(Leaderboard);