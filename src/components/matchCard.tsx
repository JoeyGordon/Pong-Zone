import * as React from "react";
import styled from "styled-components";
import * as utils from "../utils/utils";
import Match from "../models/match";
import User from "../models/user";

export type MatchCardProps = {
  match?: Match,
  teamA?: User[],
  teamB?: User[]
};

const MatchCard: React.SFC<MatchCardProps> = props => {
  const { teamA, teamB, match } = props;
  let teamAImages = [];
  let teamBImages = [];
  let teamANames = [];
  let teamBNames = [];
  teamA.forEach(player => {
    const matchPlayer = match.players.find(
      matchPlayer => matchPlayer.id === player.id
    );
    teamAImages.push(<img src={player.photoURL} alt="" key={player.id} />);
    teamANames.push(
      <span key={player.id}>{`${player.name} ${matchPlayer.rating} (${
        matchPlayer.ratingShift > 0 ? "+" : ""
      }${matchPlayer.ratingShift})`}</span>
    );
  });
  teamB.forEach(player => {
    const matchPlayer = match.players.find(
      matchPlayer => matchPlayer.id === player.id
    );
    teamBImages.push(<img src={player.photoURL} alt="" key={player.id} />);
    teamBNames.push(
      <span key={player.id}>{`${player.name} ${matchPlayer.rating} (${
        matchPlayer.ratingShift > 0 ? "+" : ""
      }${matchPlayer.ratingShift})`}</span>
    );
  });
  // this can probably be less gross
  const winningTeam = match.players.find(player => player.win === true).team;
  const teamAWinClass = winningTeam === "A" ? "winner" : "";
  const teamBWinClass = winningTeam === "B" ? "winner" : "";
  return (
    <MatchCardWrapper>
      <div className="match-date">{utils.formatDate(match.matchDate)}</div>
      <div className={`team team-a ${teamAWinClass}`}>
        <div className="team-photos">{teamAImages}</div>
        <div className="team-meta">{teamANames}</div>
        {winningTeam === "A" && <div className="win-column">W</div>}
      </div>
      <div className={`team team-b ${teamBWinClass}`}>
        <div className="team-photos">{teamBImages}</div>
        <div className="team-meta">{teamBNames}</div>
        {winningTeam === "B" && <div className="win-column">W</div>}
      </div>
    </MatchCardWrapper>
  );
};
const MatchCardWrapper = styled.div`
  margin-bottom: 1em;
  padding: 8px;
  border-radius: 3px;
  background: #fdfffc;
  box-shadow: 0 2px 2px 0 rgba(218, 218, 218, 0.5);

  .match-date {
    background: #e1e5e4;
    color: #758289;
    padding: 8px 8px;
  }

  .team {
    display: flex;
    align-items: center;
    padding: 8px;
    background: #e9eceb;
  }

  .team * {
    z-index: 2;
  }

  .team-meta span {
    display: block;
    line-height: 1.5em;
  }

  .winner {
    background: #2ec4b6;
  }

  .team-photos {
    display: flex;
  }

  .team-photos img {
    display: block;
    background: black;
    height: 48px;
    width: 48px;
    margin-right: 8px;
    border-radius: 50%;
  }

  .win-column {
    margin-left: auto;
    color: #008682;
    font-size: 1.5em;
    font-weight: bold;
    padding-right: 8px;
  }

  @media screen and (min-width: 800px) {
    .team-photos img {
      height: 70px;
      width: 70px;
    }
  }
`;
export default MatchCard;
