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
        handlePlayerReset,
        handleWinnerClick,
        submitIsValid,
    } = props;

    const playerOptions = oppPlayers.map(x => <option key={x.userId || ''} value={x.userId}>{x.name}</option>);

    const activePlayerValue = activePlayer ? `${activePlayer.name} (${activePlayer.rating})` : '';

    const teammateValue = teammate ?
        <a data-id="teammate" onClick={handlePlayerReset}>{`${teammate.name} (${teammate.rating})`}</a> :
        <select data-id="teammate" onChange={handlePlayerChange}>
            {playerOptions}
        </select>

    const oppPlayerAValue = oppPlayerA ?
        <a data-id="oppPlayerA" onClick={handlePlayerReset}>{`${oppPlayerA.name} (${oppPlayerA.rating})`}</a> :
        <select data-id="oppPlayerA" onChange={handlePlayerChange}>
            {playerOptions}
        </select>

    const oppPlayerBValue = oppPlayerB ?
        <a data-id="oppPlayerB" onClick={handlePlayerReset}>{`${oppPlayerB.name} (${oppPlayerB.rating})`}</a> :
        <select data-id="oppPlayerB" onChange={handlePlayerChange}>
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
                        {activePlayerValue}
                        <br />
                        {teammateValue}
                    </div>
                    {
                        submitIsValid ?
                            <button data-winning-team="true" onClick={handleWinnerClick}>Winner</button> :
                            null
                    }
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
                    {
                        submitIsValid ?
                            <button data-winning-team="false" onClick={handleWinnerClick}>Winner</button> :
                            null
                    }
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