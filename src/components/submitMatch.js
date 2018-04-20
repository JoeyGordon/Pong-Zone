import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlayerEloRating from '../models/playerEloRating';
import SubmitCard from './submitCard';
import * as matchActions from '../actions/match';
import MatchPlayer from '../models/matchPlayer';
// import withUserAuthedAndLoaded from '../withUserAuthedAndLoaded';

class SubmitMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerAElo: 0,
      playerBElo: 0,
      playerANewElo: 0,
      playerBNewElo: 0,
      playerAWin: 1,
      teammateId: null,
      oppPlayerAId: null,
      oppPlayerBId: null,
    };

    this.handlePlayerAChange = this.handlePlayerAChange.bind(this);
    this.handlePlayerBChange = this.handlePlayerBChange.bind(this);
    this.handleWinChange = this.handleWinChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
  }

  handlePlayerAChange(event) {
    this.setState({
      ...this.state,
      playerAElo: Number(event.target.value)
    });
  }

  handlePlayerBChange(event) {
    this.setState({
      ...this.state,
      playerBElo: Number(event.target.value)
    });
  }

  handleWinChange(event) {
    this.setState({
      ...this.state,
      playerAWin: Number(event.target.value)
    });
  }

  handlePlayerChange(event) {
    const state = {...this.state};
    state[event.target.id] = this.props.users.find(x => x.userId === event.target.value);
    this.setState(state);
  }

  handleSubmit(event) {
    const {
      playerAElo,
      playerBElo,
      playerAWin
    } = this.state;
    event.preventDefault();
    const playerAEloRating = new PlayerEloRating(playerAElo);
    const playerBEloRating = new PlayerEloRating(playerBElo);
    playerAEloRating.playerVsPlayerRatingShift(playerBElo, playerAWin);
    playerBEloRating.playerVsPlayerRatingShift(playerAElo, 1 - playerAWin);

    this.setState({
      ...this.state,
      playerANewElo: playerAEloRating.getEloRating(),
      playerBNewElo: playerBEloRating.getEloRating()
    });

    const player1Options = { userId: 1, team: 'TEAM_A', rating: 200 };
    const player2Options = { userId: 2, team: 'TEAM_B', rating: 300 };
    const players = [new MatchPlayer(player1Options), new MatchPlayer(player2Options)];
    console.log('PLAYERS', players);
    const createdBy = 3;
    const matchDate = new Date('04/01/2018');
    matchActions.recordMatch(players, createdBy, matchDate);
    
  }

  render() {
    const { user, users } = this.props;
    const activePlayer = users.find(x => x.userId === user.userId);
    const selectedPlayerIds = new Set([user.userId, this.state.teammateId, this.state.oppPlayerAId, this.state.oppPlayerBId]);
    const oppPlayers = [{}, ...(users.filter(x => !selectedPlayerIds.has(x.userId)))];

    return (
      <div>
        <h1>Submit Match</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Player A Elo:
            <input type="number" value={this.state.playerAElo} onChange={this.handlePlayerAChange} />
          </label>
          <label>
            Winner:
            <select value={this.state.playerAWin} onChange={this.handleWinChange}>
              <option value="1">&lt;-</option>
              <option value="0">-&gt;</option>
            </select>
          </label>
          <label>
            Player B Elo:
            <input type="number" value={this.state.playerBElo} onChange={this.handlePlayerBChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <br />
        <label>
          Player A New Elo:
        <input type="number" value={this.state.playerANewElo} />
        </label>
        <label>
          Player B New Elo:
        <input type="number" value={this.state.playerBNewElo} />
        </label>
        <SubmitCard
          activePlayer={activePlayer}
          oppPlayers={oppPlayers}
          teammate={this.state.teammate}
          oppPlayerA={this.state.oppPlayerA}
          oppPlayerB={this.state.oppPlayerB}
          handlePlayerChange={this.handlePlayerChange} />
      </div>
    )
  };
}

const mapStateToProps = state => ({
  user: state.user,
  users: state.users,
});

export default connect(mapStateToProps)(SubmitMatch);