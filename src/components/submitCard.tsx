import * as React from "react";
import styled from "styled-components";
import User from "../models/user";

export type SubmitCardProps = {
  oppPlayers: User[],
  activePlayer: User,
  teammate: User,
  oppPlayerA: User,
  oppPlayerB: User,
  handlePlayerChange: (...args: any[]) => any,
  handlePlayerReset: (...args: any[]) => any,
  handleWinnerClick: (...args: any[]) => any,
  submitIsValid: boolean
};

const SubmitCard: React.SFC<SubmitCardProps> = props => {
  const {
    oppPlayers,
    activePlayer,
    teammate,
    oppPlayerA,
    oppPlayerB,
    handlePlayerChange,
    handlePlayerReset,
    handleWinnerClick,
    submitIsValid
  } = props;
  const playerOptions = oppPlayers.map(x => (
    <option key={x.userId || ""} value={x.userId}>
      {x.name}
    </option>
  ));
  const teammateValue = teammate.name ? (
    <a data-id="teammate" onClick={handlePlayerReset}>{`${teammate.name} (${
      teammate.rating
      })`}</a>
  ) : (
      <select data-id="teammate" onChange={handlePlayerChange}>
        {playerOptions}
      </select>
    );
  const oppPlayerAValue = oppPlayerA.name ? (
    <a data-id="oppPlayerA" onClick={handlePlayerReset}>{`${oppPlayerA.name} (${
      oppPlayerA.rating
      })`}</a>
  ) : (
      <select data-id="oppPlayerA" onChange={handlePlayerChange}>
        {playerOptions}
      </select>
    );
  const oppPlayerBValue = oppPlayerB.name ? (
    <a data-id="oppPlayerB" onClick={handlePlayerReset}>{`${oppPlayerB.name} (${
      oppPlayerB.rating
      })`}</a>
  ) : (
      <select data-id="oppPlayerB" onChange={handlePlayerChange}>
        {playerOptions}
      </select>
    );
  return (
    <MatchCardWrapper>
      <div className="submit-card">
        <div className="team team-a">
          <div className="team-photos">
            <img src={activePlayer.photoURL} alt="" />
            <img src={teammate.photoURL} alt="" />
          </div>
          <div className="team-meta">
            <span>{`${activePlayer.name} (${activePlayer.rating})`}</span>
            <span>{teammateValue}</span>
          </div>
          {submitIsValid ? (
            <button data-winning-team="true" onClick={handleWinnerClick}>
              Winner
            </button>
          ) : null}
        </div>
        <div className="team team-b">
          <div className="team-photos">
            <img src={oppPlayerA.photoURL} alt="" />
            <img src={oppPlayerB.photoURL} alt="" />
          </div>
          <div className="team-meta">
            <span>{oppPlayerAValue}</span>
            <span>{oppPlayerBValue}</span>
          </div>
          {submitIsValid ? (
            <button data-winning-team="false" onClick={handleWinnerClick}>
              Winner
            </button>
          ) : null}
        </div>
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

  .submit-card {
    border-radius: 3px;
    background: #fdfffc;
  }

  .team {
    display: flex;
    align-items: center;
    padding: 8px;
    background: #e9eceb;
  }

  .team-a {
    margin-bottom: 2px;
  }

  .team-b {
    background: #e1e5e4;
  }

  .team-meta span {
    display: block;
    line-height: 1.5em;
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

  .team button {
    margin-left: auto;
  }

  @media screen and (min-width: 800px) {
    .team-photos img {
      height: 70px;
      width: 70px;
    }
  }
`;
export default SubmitCard;
