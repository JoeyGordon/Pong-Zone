import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayerEloRating from '../models/playerEloRating';
import SubmitCard from './submitCard';
import * as matchesActions from '../actions/matches';
import MatchPlayer from '../models/matchPlayer';
import MatchCard from './matchCard';
import User from '../models/user';
import styled from 'styled-components';

class SubmitMatch extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      teammate: null,
      oppPlayerA: null,
      oppPlayerB: null,
      activeUserEloRating: null,
      teammateEloRating: null,
      oppPlayerAEloRating: null,
      oppPlayerBEloRating: null,
      submitValid: false,
      submitted: false,
      newMatch: null,
    };

    this.state = this.initialState;

    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.handlePlayerReset = this.handlePlayerReset.bind(this);
    this.handleWinnerClick = this.handleWinnerClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handlePlayerChange(event) {
    const user = this.props.users.find(x => x.userId === event.target.value);
    this.setUserState(user, { ...this.state }, event);
  }

  getSubmitIsValid(state) {
    const {
      teammate,
      oppPlayerA,
      oppPlayerB,
    } = state;

    if ((!teammate && oppPlayerA && !oppPlayerB) || (teammate && oppPlayerA && oppPlayerB)) {
      return true;
    } else {
      return false;
    }
  }

  handlePlayerReset(event) {
    this.setUserState(null, { ...this.state }, event);
  }

  setUserState(user, state, event) {
    state[event.target.dataset.id] = user;
    state[`${event.target.dataset.id}EloRating`] = user ? new PlayerEloRating(user.rating) : null;
    state.submitValid = this.getSubmitIsValid(state);
    this.setState(state);
  }

  handleWinnerClick(event) {
    const { user, users } = this.props;
    const activePlayer = users.find(x => x.userId === user.userId);
    const activeUserEloRating = new PlayerEloRating(activePlayer.rating);
    const {
      teammate,
      oppPlayerA,
      oppPlayerB,
      teammateEloRating,
      oppPlayerAEloRating,
      oppPlayerBEloRating
    } = this.state;

    const winningTeam = Boolean(event.target.dataset.winningTeam === 'true');
    const matchPlayers = [];

    activeUserEloRating.ratingShift(winningTeam, oppPlayerAEloRating, oppPlayerBEloRating);
    matchPlayers.push(new MatchPlayer({
      userId: activePlayer.userId,
      win: winningTeam,
      team: 'A',
      rating: activeUserEloRating.getEloRating(),
      ratingShift: activeUserEloRating.getShift()
    }));
    if (teammateEloRating) {
      teammateEloRating.ratingShift(winningTeam, oppPlayerAEloRating, oppPlayerBEloRating);
      matchPlayers.push(new MatchPlayer({
        userId: teammate.userId,
        win: winningTeam,
        team: 'A',
        rating: teammateEloRating.getEloRating(),
        ratingShift: teammateEloRating.getShift()
      }));
    }

    oppPlayerAEloRating.ratingShift(!winningTeam, activeUserEloRating, teammateEloRating);
    matchPlayers.push(new MatchPlayer({
      userId: oppPlayerA.userId,
      win: !winningTeam,
      team: 'B',
      rating: oppPlayerAEloRating.getEloRating(),
      ratingShift: oppPlayerAEloRating.getShift()
    }));
    if (oppPlayerBEloRating) {
      oppPlayerBEloRating.ratingShift(!winningTeam, activeUserEloRating, teammateEloRating);
      matchPlayers.push(new MatchPlayer({
        userId: oppPlayerB.userId,
        win: !winningTeam,
        team: 'B',
        rating: oppPlayerBEloRating.getEloRating(),
        ratingShift: oppPlayerBEloRating.getShift()
      }));
    }
    const isDoubles = matchPlayers.length === 4;
    const newMatch = matchesActions.recordMatch(matchPlayers, isDoubles, activePlayer.userId, new Date());

    this.setState({
      ...this.state,
      activeUserEloRating: activeUserEloRating,
      teammateEloRating: teammateEloRating,
      oppPlayerAEloRating: oppPlayerAEloRating,
      oppPlayerBEloRating: oppPlayerBEloRating,
      submitted: true,
      newMatch,
    });
  }

  handleReset(event) {
    this.setState(this.initialState);
  }

  render() {
    const { user, users } = this.props;
    const {
      teammate,
      oppPlayerA,
      oppPlayerB,
      activeUserEloRating,
      teammateEloRating,
      oppPlayerAEloRating,
      oppPlayerBEloRating,
      submitValid,
      submitted,
      newMatch,
    } = this.state;

    const activePlayer = users.find(x => x.userId === user.userId);
    const selectedPlayerIds = new Set([
      user.userId,
      _.get(teammate, 'userId'),
      _.get(oppPlayerA, 'userId'),
      _.get(oppPlayerB, 'userId')
    ]);
    const oppPlayers = [{}, ...(users.filter(x => !selectedPlayerIds.has(x.userId)))];

    let submitCard = <div></div>;

    if (submitted) {
      const teamA = [{
        ...activePlayer,
        rating: activeUserEloRating.getEloRating(),
      }];
      if (teammate) {
        teamA.push({
          ...teammate,
          rating: teammateEloRating.getEloRating()
        });
      }

      const teamB = [{
        ...oppPlayerA,
        rating: oppPlayerAEloRating.getEloRating()
      }];
      if (oppPlayerB) {
        teamB.push({
          ...oppPlayerB,
          rating: oppPlayerBEloRating.getEloRating()
        });
      }

      submitCard = <div>
        <MatchCard
          match={newMatch}
          teamA={teamA}
          teamB={teamB} />
        <button onClick={this.handleReset}>Submit New Match</button>
      </div>
    } else {
      submitCard = <SubmitCard
        oppPlayers={oppPlayers}
        activePlayer={new User(activePlayer)}
        teammate={new User(teammate)}
        oppPlayerA={new User(oppPlayerA)}
        oppPlayerB={new User(oppPlayerB)}
        handlePlayerChange={this.handlePlayerChange}
        handlePlayerReset={this.handlePlayerReset}
        handleWinnerClick={this.handleWinnerClick}
        submitIsValid={submitValid} />
    }

    return (
      <SubmitMatchWrapper>
        <div className="page-header">
          <h1>Submit A Match</h1>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon fill="white" points="0,100 100,0 100,100" />
          </svg>
        </div>

        <div className="page-content">
          {submitCard}
        </div>
      </SubmitMatchWrapper>
    )
  };
}

const mapStateToProps = state => ({
  user: state.user,
  users: state.users,
});

const SubmitMatchWrapper = styled.div`
  .page-content {
    background: transparent;
    padding: 0;
    box-shadow: none;
    top: -218px;
  }
`;

export default connect(mapStateToProps)(SubmitMatch);