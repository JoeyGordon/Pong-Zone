import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import PageHeader from './pageHeader';

class LeaderboardDoubles extends Component {
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
    const { users } = this.props;
    const sortedTeamsByRating = _.orderBy(this.props.teams, 'rating', 'desc');
    const sortedTeamsWithMemberNames = _.map(sortedTeamsByRating, team => {
        team.names = [];
        team.members.forEach(member => {
            const user = _.find(users, user => user.userId === member);
            team.names.push(user.name);
        });
        return team;
    })

    const teamsList = sortedTeamsWithMemberNames.map((team, index) => {
    //   const selectedTeamClass = (selectedUser && team.team === selectedTeam.teamId) ?
    //     "selected-user" :
    //     null;

      return (
        <a key={team.teamId} href={`/user/${team.teamId}`} onClick={(e) => {this.handleUserSelect(e, team)}}>
          <li /*className={selectedTeamClass}*/>
            {/* <img src={user.photoURL} alt="" /> */}
            <div className="user-name">
              <h3>{team.names[0] + " & " + team.names[1]}</h3>
              <span className="user-rating">{team.rating}</span>
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
      <LeaderboardDoublesWrapper>
        <PageHeader title="Leaderboard">
          <div className="page-filter">
            {filter}
          </div>
        </PageHeader>

        <div className="page-content">
          <ol>
            {teamsList}
          </ol>
          {/* {(selectedUser && selectedUser.userId) && <UserProfile user={selectedUser} />} */}
        </div>
      </LeaderboardDoublesWrapper>
    )
  }
}

LeaderboardDoubles.propTypes = {
  teams: PropTypes.array,
  loggedInUser: PropTypes.object,
};

const mapStateToProps = state => ({
    users: state.users,
  teams: state.teams,
  loggedInUser: state.user,
});

const LeaderboardDoublesWrapper = styled.div`
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

export default connect(mapStateToProps)(LeaderboardDoubles);