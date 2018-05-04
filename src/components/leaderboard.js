import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

// import UserProfile from './userProfile';
import PageHeader from './pageHeader';

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: null,
      filter: 'singles',
    };

    this.handleUserSelect = this.handleUserSelect.bind(this);
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
        <a className="leaderboard-user" key={user.userId} href={`/user/${user.userId}`} onClick={(e) => {this.handleUserSelect(e, user)}}>
          <li className={selectedUserClass}>
            <img src={user.photoURL} alt="" />
            <div className="user-name">
              <h3>{user.name}</h3>
              <span className="user-rating">{user.rating}</span>
            </div>
            <div className="user-rank">
              {index + 1}
            </div>
          </li>
        </a>
      )
    });

    const filter = (
      <ul className="filter-list">
        <li className="selected"><a href="">Singles</a></li>
        <li><a href="">Doubles</a></li>
      </ul>
    )

    return (
      <LeaderboardWrapper>
        <PageHeader title="Leaderboard">
          <div className="page-filter">
            {filter}
          </div>
        </PageHeader>

        <div className="page-content">
          <ol>
            {usersList}
          </ol>
          {/* {(selectedUser && selectedUser.userId) && <UserProfile user={selectedUser} />} */}
        </div>
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
  .page-content {
    padding-bottom: 4px;
  }

  ol {
    margin: 0px;
    margin-bottom: -4px;
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
    background: #E9ECEB;
    margin-bottom: 8px;
    border-radius: 3px;
  }

  .selected-user{
    /* background: #FCD581; */
  }

  li h3{
    margin: 0 0 4px 0;
    padding: 0;
    font-weight: 100;
  }

  .leaderboard-user img {
    background: #DDD;
    flex-grow: 0;
    height: 50px;
    min-width: 50px;
    width: auto;
    margin: 8px;
    border-radius: 50%;
  }

  .user-rank {
    display: flex;
    margin-left: auto;
    align-items: center;
    justify-content: center;
    font-size: 2em;
    font-weight: bold;
    padding: 0 1em;
  }

  .user-rating {
    color: #747F88;
    font-weight: 100;
  }

  .filter-list {
    display: flex;
    margin: 0;
    padding: 0;
  }

  .filter-list li {
    display: flex;
    flex: 1;
  }

  .filter-list li a {
    flex: 1;
    text-align: center;
    border-radius: 3px;
    padding: 10px 0;
  }

  .filter-list li.selected a {
    background: rgba(0, 0, 0, 0.25);
  }

  @media screen and (min-width: 800px) {
    .filter-list {
      max-width: 800px;
      margin: 0 auto;
    }

    .leaderboard-user img {
      height: 70px;
      width: 70px;
    }
  }
`;

export default connect(mapStateToProps)(Leaderboard);