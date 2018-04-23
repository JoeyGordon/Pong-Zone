import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayerEloRating from '../models/playerEloRating';
import SubmitCard from './submitCard';
import * as matchesActions from '../actions/matches';
import MatchPlayer from '../models/matchPlayer';
import MatchCard from './matchCard';
// import Match from '../models/match';

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
      winningTeam: null,
      newMatch: null,
    };

    this.state = this.initialState;

    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.handlePlayerReset = this.handlePlayerReset.bind(this);
    this.handleWinnerClick = this.handleWinnerClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handlePlayerChange(event) {
    const state = { ...this.state };
    const user = this.props.users.find(x => x.userId === event.target.value);
    state[event.target.dataset.id] = user;
    state[`${event.target.dataset.id}EloRating`] = new PlayerEloRating(user.rating);
    state.submitValid = this.getSubmitIsValid(state);
    this.setState(state);
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
    const state = { ...this.state };
    state[event.target.dataset.id] = null;
    state.submitValid = this.getSubmitIsValid(state);
    this.setState(state);
  }

  handleWinnerClick(event) {
    const winningTeam = Boolean(event.target.dataset.winningTeam === 'true');
    this.setState({
      ...this.state,
      winningTeam: winningTeam,
    });
  }

  handleSubmitClick(event) {
    const { user, users } = this.props;
    const activePlayer = users.find(x => x.userId === user.userId);
    const activeUserEloRating = new PlayerEloRating(activePlayer.rating);
    const {
      teammate,
      oppPlayerA,
      oppPlayerB,
      teammateEloRating,
      oppPlayerAEloRating,
      oppPlayerBEloRating,
      winningTeam,
    } = this.state;

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

    const newMatch = matchesActions.recordMatch(matchPlayers, activePlayer.userId, new Date());

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
      winningTeam,
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
      if (oppPlayerB){
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
        <button onClick={this.handleReset}>Reset</button>
      </div>
    } else {
      submitCard = <SubmitCard
        oppPlayers={oppPlayers}
        activePlayer={activePlayer}
        teammate={teammate}
        oppPlayerA={oppPlayerA}
        oppPlayerB={oppPlayerB}
        handlePlayerChange={this.handlePlayerChange}
        handlePlayerReset={this.handlePlayerReset}
        handleWinnerClick={this.handleWinnerClick}
        handleSubmitClick={this.handleSubmitClick}
        winningTeam={winningTeam}
        submitIsValid={submitValid} />
    }

    return (
      <div>
        <h1>Submit Match</h1>
        {submitCard}
      </div>
    )
  };
}

const mapStateToProps = state => ({
  user: state.user,
  users: state.users,
});

export default connect(mapStateToProps)(SubmitMatch);