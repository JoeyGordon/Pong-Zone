import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SubmitCard from './submitCard';
import MatchCard from './matchCard';
import * as matchesActions from '../actions/matches';
import * as usersActions from '../actions/users';
import * as teamsActions from '../actions/teams';
import * as teamsService from '../services/teams';
import * as usersService from '../services/users';
import * as matchesService from '../services/matches';
import MatchPlayer from '../models/matchPlayer';
import User from '../models/user';
import PlayerEloRating from '../models/playerEloRating';
import TeamEloRating from '../models/teamEloRating';
import DoublesTeam from '../models/doublesTeam';
import Match from "../models/match";
import styled from 'styled-components';
import * as Utils from '../utils/utils';
import PageHeader from './pageHeader';


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

    console.log('PROPS', this.props);

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
    const { user, users, teams, dispatch } = this.props;
    const activePlayer = users.find(x => x.userId === user.userId);
    const activeUserEloRating = new PlayerEloRating(activePlayer.rating);
    const {
      teammate,
      oppPlayerA,
      oppPlayerB,
      teammateEloRating,
      oppPlayerAEloRating,
      oppPlayerBEloRating,
    } = this.state;

    const winningTeam = Boolean(event.target.dataset.winningTeam === 'true');
    const matchPlayers = [];
    const doublesTeams = [];
    let isDoubles = false;

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

    // If we're in a doubles situation, create the doublesTeams
    if(matchPlayers.length === 4){
      isDoubles = true;

      // create teamIds
      const teamId = Utils.getTeamIdFromUserIds(activePlayer.userId, teammate.userId);
      const oppTeamId = Utils.getTeamIdFromUserIds(oppPlayerA.userId, oppPlayerB.userId);

      
      // find teams or else create new ones we will persist later
      const team = teams.find(t => t.teamId === teamId) || new DoublesTeam({
        teamId,
        members: [activePlayer.userId, teammate.userId],
        matches: [],
        rating: -1,
        wins: 0,
        losses: 0,
      });

      const oppTeamMembers = [oppPlayerA.userId, oppPlayerB.userId];
      const oppTeam = teams.find(t => t.teamId === oppTeamId) || new DoublesTeam({
        teamId: oppTeamId,
        members: oppTeamMembers,
        matches: [],
        rating: -1,
        wins: 0,
        losses: 0,
      });

      // winningTeam represents the fact that 'team' won. If false, then oppTeam won.
      if(winningTeam){
        team.wins++;
        oppTeam.losses++;
      }
      else{
        team.losses++;
        team.wins++;
      }

      const teamEloRating = team.rating === -1 ? new TeamEloRating(activeUserEloRating, teammateEloRating) : new TeamEloRating(team.rating);
      const oppTeamEloRating = oppTeam.rating === -1 ? new TeamEloRating(oppPlayerAEloRating, oppPlayerBEloRating) : new TeamEloRating(oppTeam.rating);

      teamEloRating.ratingShift(winningTeam, oppTeamEloRating);
      oppTeamEloRating.ratingShift(!winningTeam, teamEloRating);
      
      team.rating = teamEloRating.getEloRating();
      oppTeam.rating = oppTeamEloRating.getEloRating();

      doublesTeams.push(team);
      doublesTeams.push(oppTeam);

    }

    const options = { players: matchPlayers, isDoubles, matchDate: new Date(), createdBy: activePlayer.userId }
    const newMatch = new Match(options);
    // record new match and update redux matches
    matchesService.recordMatch(newMatch)
    dispatch(matchesActions.addMatch(newMatch));

    // update users userMatch collections with new match info
    usersService.updateUsersWithMatch(newMatch);
    dispatch(usersActions.updateUsersWithMatch(newMatch));

    // if doubles, record new teams if necessary and add matchId to team's matches collection
    if (isDoubles){
      doublesTeams.forEach(team => {
        team.matches.push(newMatch.matchId);
      });
      teamsService.updateTeams(doublesTeams);
      dispatch(teamsActions.updateTeams(teams));
    }

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
        <PageHeader title="Submit A Match" />

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
  teams: state.teams,
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