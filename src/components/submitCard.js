import React from 'react';
import styled from 'styled-components';

const SubmitCard = (props) => {
    const {
        activePlayer,
        oppPlayers,
        teammate,
        oppPlayerA,
        oppPlayerB,
        handlePlayerChange,
    } = props;

    const playerOptions = oppPlayers.map(x => <option key={x.userId} value={x.userId}>{x.name}</option>);

    const teammateValue = teammate ?
        teammate.name :
        <select id="teammateId" onChange={handlePlayerChange}>
            {playerOptions}
        </select>

    const oppPlayerAValue = oppPlayerA ?
        oppPlayerA.name :
        <select id="oppPlayerAId" onChange={handlePlayerChange}>
            {playerOptions}
        </select>

    const oppPlayerBValue = oppPlayerB ?
        oppPlayerB.name :
        <select id="oppPlayerBId" onChange={handlePlayerChange}>
            {playerOptions}
        </select>

    return (
        <MatchCardWrapper>
            <div className="match-card">
                <div className="team team-a">
                    <div className="team-photos">
                        <img src="http://via.placeholder.com/60x60" alt="" />
                        <img src="http://via.placeholder.com/60x60" alt="" />
                    </div>
                    <div className="team-meta">
                        {activePlayer ? activePlayer.name : ''}
                        <br />
                        {teammateValue}
                    </div>
                </div>
                <div className="team team-b">
                    <div className="team-photos">
                        <img src="http://via.placeholder.com/60x60" alt="" />
                        <img src="http://via.placeholder.com/60x60" alt="" />
                    </div>
                    <div className="team-meta">
                        {oppPlayerAValue}
                        <br />
                        {oppPlayerBValue}
                    </div>
                </div>
                <div className="match-vs">VS</div>
            </div>
        </MatchCardWrapper>
    )
};

const MatchCardWrapper = styled.div`
  margin-bottom: 1em;

  .match-card {
      display: flex;
      position: relative;
      max-width: 900px;
      background: #EEE;
  }

  .team {
      display: flex;
      align-items: center;
      padding: 1em;
      width: 50%;
  }

  .team * {
      z-index: 2;
  }

  .team-meta {
    color: #EEE
  }

  .team-a {
    background: #33F;
  }

  .team-b {
      flex-direction: row-reverse;
      background: #F33;
  }

  .team-photos {
      display: flex;
  }

  .team-photos img {
      display: block;
      background: black;
      height: 60px;
      width: 60px;
      margin-right: 1em;
  }

  .team-b .team-photos img {
      margin-right: 0;
      margin-left: 1em;
  }

  .match-vs {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      height: 100%;
      width: 100%;
      font-weight: bold;
      font-size: 2em;
      font-style: italic;
      color: #FFF
  }
`;

export default SubmitCard;