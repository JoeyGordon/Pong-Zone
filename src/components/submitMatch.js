import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayerEloRating from '../models/playerEloRating';

class SubmitMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerAElo: 0,
      playerBElo: 0,
      playerANewElo: 0,
      playerBNewElo: 0,
      playerAWin: 1,
    };

    this.handlePlayerAChange = this.handlePlayerAChange.bind(this);
    this.handlePlayerBChange = this.handlePlayerBChange.bind(this);
    this.handleWinChange = this.handleWinChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    const {
      playerAElo,
      playerBElo,
      playerAWin
    } = this.state;

    const playerAEloRating = new PlayerEloRating(playerAElo);
    const playerBEloRating = new PlayerEloRating(playerBElo);
    playerAEloRating.playerVsPlayerRatingShift(playerBElo, playerAWin);
    playerBEloRating.playerVsPlayerRatingShift(playerAElo, 1 - playerAWin);

    this.setState({
      ...this.state,
      playerANewElo: playerAEloRating.getEloRating(),
      playerBNewElo: playerBEloRating.getEloRating()
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Submit Match</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Player A Elo:
            <input type="number" value={this.state.playerAElo} onChange={this.handlePlayerAChange} />
          </label>
          <label>
            Player A Win:
            <input type="number" value={this.state.playerAWin} onChange={this.handleWinChange} />
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
      </div>
    )
  };
}

SubmitMatch.contextTypes = {
  authUser: PropTypes.object,
};

export default SubmitMatch;