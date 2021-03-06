import * as React from "react";
import { connect } from "react-redux";
import SubmitCard from "./submitCard";
import MatchCard from "./matchCard";
import * as matchesActions from "../actions/matches";
import * as usersActions from "../actions/users";
import * as teamsActions from "../actions/teams";
import * as teamsService from "../services/teams";
import * as usersService from "../services/users";
import * as matchesService from "../services/matches";
import MatchPlayer from "../models/matchPlayer";
import User from "../models/user";
import PlayerEloRating from "../models/playerEloRating";
import TeamEloRating from "../models/teamEloRating";
import DoublesTeam from "../models/doublesTeam";
import Match from "../models/match";
import styled from "styled-components";
import * as Utils from "../utils/utils";
import PageHeader from "./pageHeader";

type Props = {
  user: User,
  users: User[],
  teams: any,
  dispatch?: ({ }) => void;
}

type SubmitMatchState = {
  teammate?: User,
  oppPlayerA: User,
  oppPlayerB: User,
  activeUserEloRating: PlayerEloRating,
  teammateEloRating: PlayerEloRating,
  oppPlayerAEloRating: PlayerEloRating,
  oppPlayerBEloRating: PlayerEloRating,
  submitValid: boolean,
  submitted: boolean,
  newMatch: Match
}

class SubmitMatch extends React.Component<Props, SubmitMatchState> {
  readonly initialState: SubmitMatchState = {
    teammate: null,
    oppPlayerA: null,
    oppPlayerB: null,
    activeUserEloRating: null,
    teammateEloRating: null,
    oppPlayerAEloRating: null,
    oppPlayerBEloRating: null,
    submitValid: false,
    submitted: false,
    newMatch: null
  }

  state: SubmitMatchState = {
    teammate: null,
    oppPlayerA: null,
    oppPlayerB: null,
    activeUserEloRating: null,
    teammateEloRating: null,
    oppPlayerAEloRating: null,
    oppPlayerBEloRating: null,
    submitValid: false,
    submitted: false,
    newMatch: null
  }

  constructor(props) {
    super(props);
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.handlePlayerReset = this.handlePlayerReset.bind(this);
    this.handleWinnerClick = this.handleWinnerClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handlePlayerChange(event) {
    const user = this.props.users.find(x => x.id === event.target.value);
    this.setUserState(user, { ...this.state }, event);
  }

  getSubmitIsValid(state) {
    const { teammate, oppPlayerA, oppPlayerB } = state;
    if (
      (!teammate && oppPlayerA && !oppPlayerB) ||
      (teammate && oppPlayerA && oppPlayerB)
    ) {
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
    state[`${event.target.dataset.id}EloRating`] = user
      ? new PlayerEloRating(user.rating)
      : null;
    state.submitValid = this.getSubmitIsValid(state);
    this.setState(state);
  }

  handleWinnerClick(event) {
    const { user, users, teams, dispatch } = this.props;
    const activePlayer = users.find(x => x.id === user.id);
    const activeUserEloRating = new PlayerEloRating(activePlayer.rating);
    const {
      teammate,
      oppPlayerA,
      oppPlayerB,
      teammateEloRating,
      oppPlayerAEloRating,
      oppPlayerBEloRating
    } = this.state;
    const winningTeam = Boolean(event.target.dataset.winningTeam === "true");
    const matchPlayers = [];
    const doublesTeams = [];
    let isDoubles = false;

    if (!oppPlayerBEloRating) {
      activeUserEloRating.ratingShift(
        winningTeam,
        oppPlayerAEloRating
      );
    }
    matchPlayers.push(
      new MatchPlayer({
        id: activePlayer.id,
        win: winningTeam,
        team: "A",
        rating: activeUserEloRating.getEloRating(),
        ratingShift: activeUserEloRating.getShift()
      })
    );
    if (teammateEloRating) {
      matchPlayers.push(
        new MatchPlayer({
          id: teammate.id,
          win: winningTeam,
          team: "A",
          rating: teammateEloRating.getEloRating(),
          ratingShift: teammateEloRating.getShift()
        })
      );
    }

    if (!teammateEloRating) {
      oppPlayerAEloRating.ratingShift(
        !winningTeam,
        activeUserEloRating
      );
    }
    matchPlayers.push(
      new MatchPlayer({
        id: oppPlayerA.id,
        win: !winningTeam,
        team: "B",
        rating: oppPlayerAEloRating.getEloRating(),
        ratingShift: oppPlayerAEloRating.getShift()
      })
    );
    if (oppPlayerBEloRating) {
      matchPlayers.push(
        new MatchPlayer({
          id: oppPlayerB.id,
          win: !winningTeam,
          team: "B",
          rating: oppPlayerBEloRating.getEloRating(),
          ratingShift: oppPlayerBEloRating.getShift()
        })
      );
    }

    // If we're in a doubles situation, create the doublesTeams
    if (matchPlayers.length === 4) {
      isDoubles = true;
      // create teamIds
      const teamId = Utils.getTeamIdFromUserIds(
        activePlayer.id,
        teammate.id
      );
      const oppTeamId = Utils.getTeamIdFromUserIds(
        oppPlayerA.id,
        oppPlayerB.id
      );
      // find teams or else create new ones we will persist later
      const team =
        teams.find(t => t.teamId === teamId) ||
        new DoublesTeam({
          teamId,
          members: [activePlayer.id, teammate.id],
          matches: [],
          rating: -1,
          wins: 0,
          losses: 0
        });
      const oppTeamMembers = [oppPlayerA.id, oppPlayerB.id];
      const oppTeam =
        teams.find(t => t.teamId === oppTeamId) ||
        new DoublesTeam({
          teamId: oppTeamId,
          members: oppTeamMembers,
          matches: [],
          rating: -1,
          wins: 0,
          losses: 0
        });
      // winningTeam represents the fact that 'team' won. If false, then oppTeam won.
      if (winningTeam) {
        team.wins++;
        oppTeam.losses++;
      } else {
        team.losses++;
        team.wins++;
      }
      const teamEloRating =
        team.rating === -1
          ? new TeamEloRating(activeUserEloRating, teammateEloRating)
          : TeamEloRating.createTeamEloRatingFromNumber(team.rating);
      const oppTeamEloRating =
        oppTeam.rating === -1
          ? new TeamEloRating(oppPlayerAEloRating, oppPlayerBEloRating)
          : TeamEloRating.createTeamEloRatingFromNumber(oppTeam.rating);
      teamEloRating.ratingShift(winningTeam, oppTeamEloRating);
      oppTeamEloRating.ratingShift(!winningTeam, teamEloRating);
      team.rating = teamEloRating.getEloRating();
      oppTeam.rating = oppTeamEloRating.getEloRating();
      doublesTeams.push(team);
      doublesTeams.push(oppTeam);
    }

    const options = {
      players: matchPlayers,
      isDoubles,
      matchDate: new Date(),
      createdBy: activePlayer.id
    };

    const newMatch = new Match(options);
    // record new match and update redux matches
    matchesService.recordMatch(newMatch);
    dispatch(matchesActions.addMatch(newMatch));
    // update users userMatch collections with new match info
    usersService.updateUsersWithMatch(newMatch);
    dispatch(usersActions.updateUsersWithMatch(newMatch));
    // if doubles, record new teams if necessary and add matchId to team's matches collection
    if (isDoubles) {
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
      newMatch
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
      newMatch
    } = this.state;
    const selectedPlayerIds = new Set([user.id]);
    if (teammate) selectedPlayerIds.add(teammate.id);
    if (oppPlayerA) selectedPlayerIds.add(oppPlayerA.id);
    if (oppPlayerB) selectedPlayerIds.add(oppPlayerB.id);

    const oppPlayers = [
      {} as User,
      ...users.filter(x => !selectedPlayerIds.has(x.id))
    ];
    let submitCard = <div />;
    if (submitted) {
      const teamA = [
        {
          ...user,
          rating: activeUserEloRating.getEloRating()
        }
      ];
      if (teammate) {
        teamA.push({
          ...teammate,
          rating: teammateEloRating.getEloRating()
        });
      }
      const teamB = [
        {
          ...oppPlayerA,
          rating: oppPlayerAEloRating.getEloRating()
        }
      ];
      if (oppPlayerB) {
        teamB.push({
          ...oppPlayerB,
          rating: oppPlayerBEloRating.getEloRating()
        });
      }
      submitCard = (
        <div>
          <MatchCard match={newMatch} teamA={teamA} teamB={teamB} />
          <button onClick={this.handleReset}>Submit New Match</button>
        </div>
      );
    } else {
      submitCard = (
        <SubmitCard
          oppPlayers={oppPlayers}
          activePlayer={user}
          teammate={teammate}
          oppPlayerA={oppPlayerA}
          oppPlayerB={oppPlayerB}
          handlePlayerChange={this.handlePlayerChange}
          handlePlayerReset={this.handlePlayerReset}
          handleWinnerClick={this.handleWinnerClick}
          submitIsValid={submitValid}
        />
      );
    }
    return (
      <SubmitMatchWrapper>
        <PageHeader title="Submit A Match" />

        <div className="page-content">{submitCard}</div>
      </SubmitMatchWrapper>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  users: state.users,
  teams: state.teams
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
