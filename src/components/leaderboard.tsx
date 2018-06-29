import * as _ from 'lodash';
import * as React from 'react';
import * as  PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as leaderboard from '../constants/leaderboard';

import PageHeader from './pageHeader';
import User from '../models/user';
import DoublesTeam from '../models/doublesTeam';
import { MainLayoutProps } from './mainLayout';


type Props = {
  users: User[],
  teams: any,
  dispatch?: ({ }) => void;
}

type LeaderboardState = {
  selectedUser: User,
  selectedTeam: DoublesTeam,
  filter: string
}

class Leaderboard extends React.Component<Props & MainLayoutProps, LeaderboardState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: null,
      selectedTeam: null,
      filter: leaderboard.FILTER_SINGLES,
    };

    this.handleUserSelect = this.handleUserSelect.bind(this);
    this.handleFilterSelect = this.handleFilterSelect.bind(this);
  }

  componentDidMount() {
    if (this.props.loggedInUser.id) {
      this.setState({ selectedUser: this.props.loggedInUser });
    }
  }

  handleFilterSelect(event, filter) {
    event.preventDefault();
    this.setState({filter: filter});
   }

  handleUserSelect(event, user) {
    event.preventDefault();
    this.setState({selectedUser: user});
  }

  render() {
    const { selectedUser } = this.state;
    const { selectedTeam } = this.state;
    const { users } = this.props;

    const sortedUsersByRating = _.orderBy(users, 'rating', 'desc');
    const usersList = sortedUsersByRating.map((user, index) => {
      const selectedUserClass = (selectedUser && user.id === selectedUser.id) ?
        "selected-user" :
        null;

      return (
        <a className="leaderboard-user"
          key={user.id}
          href={`/user/${user.id}`}
          onClick={(e) => {this.handleUserSelect(e, user)}}
        >
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

    const sortedTeamsByRating = _.orderBy(this.props.teams, 'rating', 'desc');
    const sortedTeamsWithMemberNames = _.map(sortedTeamsByRating, team => {
      team.names = [];
      team.images = [];
      team.members.forEach(member => {
        const user = _.find(users, user => user.id === member);
        team.names.push(user.name);
        team.images.push(user.photoURL);
      });
      return team;
    })

    const teamsList = sortedTeamsWithMemberNames.map((team, index) => {
      const selectedTeamClass = (selectedTeam && team.team === selectedTeam.teamId) ?
        "selected-user" :
        null;

      return (
        <a className="leaderboard-user"
          key={team.teamId} href={`/user/${team.teamId}`}
          onClick={(e) => { this.handleUserSelect(e, team) }}
        >
          <li className={selectedTeamClass}>
            <img src={team.images[0]} alt="" /><img src={team.images[1]} alt="" />
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
        <li className={this.state.filter === leaderboard.FILTER_SINGLES ? 'selected' : null}>
          <a href="#singles" onClick={(e) => {this.handleFilterSelect(e, leaderboard.FILTER_SINGLES)}}>Singles</a>
        </li>
        <li className={this.state.filter === leaderboard.FILTER_DOUBLES ? 'selected' : null}>
          <a href="#doubles" onClick={(e) => {this.handleFilterSelect(e, leaderboard.FILTER_DOUBLES)}}>Doubles</a>
        </li>
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
            {this.state.filter === leaderboard.FILTER_SINGLES && usersList}
            {this.state.filter === leaderboard.FILTER_DOUBLES && teamsList}
          </ol>
          {/* {(selectedUser && selectedUser.id) && <UserProfile user={selectedUser} />} */}
        </div>
      </LeaderboardWrapper>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users,
  teams: state.teams,
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

  .leaderboard-user li {
    padding: 8px;
  }

  .leaderboard-user img {
    flex-grow: 0;
      display: block;
      background: black;
      height: 48px;
      width: 48px;
      margin-right: 8px;
      border-radius: 50%;
  }

  .user-rank {
    display: flex;
    margin-left: auto;
    align-items: center;
    justify-content: center;
    font-size: 2em;
    font-weight: bold;
    padding: 0 0.5em;
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

    .user-rank {
      padding: 0 1em;
    }
  }
`;

export default connect(mapStateToProps)(Leaderboard);