import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayerEloRating from '../models/playerEloRating';
import SubmitCard from './submitCard';
import * as matchActions from '../actions/match';
import MatchPlayer from '../models/matchPlayer';
import MatchCard from './matchCard';

// import withUserAuthedAndLoaded from '../withUserAuthedAndLoaded';

class SubmitMatch extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      teammate: null,
      oppPlayerA: null,
      oppPlayerB: null,
      newActiveUserEloRating: null,
      newTeammateEloRating: null,
      newOppPlayerAEloRating: null,
      newOppPlayerBEloRating: null,
      submitIsValid: false,
      submitted: false,
    };

    this.state = this.initialState;

    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.handlePlayerReset = this.handlePlayerReset.bind(this);
    this.handleWinnerClick = this.handleWinnerClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handlePlayerChange(event) {
    const state = { ...this.state };
    state[event.target.dataset.id] = this.props.users.find(x => x.userId === event.target.value);
    state.submitIsValid = this.getSubmitIsValid(state);
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
    state.submitIsValid = this.getSubmitIsValid(state);
    this.setState(state);
  }

  handleWinnerClick(event) {
    const winningTeam = Boolean(event.target.dataset.winningTeam === 'true');
    const { user } = this.props;
    const { teammate, oppPlayerA, oppPlayerB } = this.state;

    const activeUserEloRating = new PlayerEloRating(user.rating);
    const teammateEloRating = teammate ? new PlayerEloRating(teammate.rating) : null;
    const oppPlayerARating = new PlayerEloRating(oppPlayerA.rating);
    const oppPlayerBRating = oppPlayerB ? new PlayerEloRating(oppPlayerB.rating) : null;

    activeUserEloRating.ratingShift(winningTeam, oppPlayerARating, oppPlayerBRating);
    if (teammateEloRating) {
      teammateEloRating.ratingShift(winningTeam, oppPlayerARating, oppPlayerBRating);
    }

    oppPlayerARating.ratingShift(!winningTeam, activeUserEloRating, teammateEloRating);
    if (oppPlayerBRating) {
      oppPlayerBRating.ratingShift(!winningTeam, activeUserEloRating, teammateEloRating);
    }

    this.setState({
      ...this.state,
      newActiveUserEloRating: activeUserEloRating.getEloRating(),
      newTeammateEloRating: teammateEloRating ? teammateEloRating.getEloRating() : null,
      newOppPlayerAEloRating: oppPlayerARating.getEloRating(),
      newOppPlayerBEloRating: oppPlayerBRating ? oppPlayerBRating.getEloRating() : null,
      submitted: true,
    });

    const player1Options = { userId: 1, team: 'TEAM_A', rating: 200 };
    const player2Options = { userId: 2, team: 'TEAM_B', rating: 300 };
    const players = [new MatchPlayer(player1Options), new MatchPlayer(player2Options)];
    console.log('PLAYERS', players);
    const createdBy = 3;
    const matchDate = new Date('04/01/2018');
    matchActions.recordMatch(players, createdBy, matchDate);
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
      newActiveUserEloRating,
      newTeammateEloRating,
      newOppPlayerAEloRating,
      newOppPlayerBEloRating,
      submitIsValid,
      submitted,
    } = this.state;

    const activePlayer = users.find(x => x.userId === user.userId);
    const selectedPlayerIds = new Set([
      user.userId,
      _.get(teammate, 'userId'),
      _.get(oppPlayerA, 'userId'),
      _.get(oppPlayerB, 'userId')
    ]);
    const oppPlayers = [{}, ...(users.filter(x => !selectedPlayerIds.has(x.userId)))];

    let card = <div></div>;

    if (submitted) {
      const updatedActivePlayer = {
        ...activePlayer,
        rating: newActiveUserEloRating,
      }
      const updatedTeammate = teammate ? {
        ...teammate,
        rating: newTeammateEloRating
      } : null;
      const updatedOppPlayerA = {
        ...oppPlayerA,
        rating: newOppPlayerAEloRating
      };
      const updatedOppPlayerB = oppPlayerB ? {
        ...oppPlayerB,
        rating: newOppPlayerBEloRating
      } : null;

      card = <div><MatchCard
        activePlayer={updatedActivePlayer}
        teammate={updatedTeammate}
        oppPlayerA={updatedOppPlayerA}
        oppPlayerB={updatedOppPlayerB} />
        <button onClick={this.handleReset}>Reset</button>
      </div>
    } else {
      card = <SubmitCard
        oppPlayers={oppPlayers}
        activePlayer={activePlayer}
        teammate={teammate}
        oppPlayerA={oppPlayerA}
        oppPlayerB={oppPlayerB}
        handlePlayerChange={this.handlePlayerChange}
        handlePlayerReset={this.handlePlayerReset}
        handleWinnerClick={this.handleWinnerClick}
        submitIsValid={submitIsValid} />
    }

    return (
      <div>
        <h1>Submit Match</h1>
        {card}
      </div>
    )
  };
}

const mapStateToProps = state => ({
  user: state.user,
  users: state.users,
});

export default connect(mapStateToProps)(SubmitMatch);