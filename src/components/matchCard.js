// import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MatchCard = (props) => {
    const {match, teamA, teamB} = props;
    const {
        players,
        accepted,
        matchDate,
        createdBy,
    } = match;

    let teamAImages = [];
    let teamBImages = [];
    let teamANames = [];
    let teamBNames = [];

    props.teamA.forEach(player => {
        teamAImages.push(<img src={player.photoURL} alt="" key={player.photoURL} />);
        teamANames.push(<span key={player.userId}>{player.name}</span>)
    })

    teamB.forEach(player => {
        teamBImages.push(<img src={player.photoURL} alt="" key={player.photoURL} />)
        teamBNames.push(<span key={player.userId}>{player.name}</span>)
    })

    // const activePlayerValue = activePlayer ? `${activePlayer.name} (${activePlayer.rating})` : '';
    // const teammateValue = teammate ? `${teammate.name} (${teammate.rating})` : '';
    // const oppPlayerAValue = oppPlayerA ? `${oppPlayerA.name} (${oppPlayerA.rating})` : '';
    // const oppPlayerBValue = oppPlayerB ? `${oppPlayerB.name} (${oppPlayerB.rating})` : '';

    return (
        <MatchCardWrapper>
            <div className="match-card">
                <div className="team team-a winner">
                    <div className="team-photos">
                        {teamAImages}
                    </div>
                    <div className="team-meta">
                        {teamANames}
                    </div>
                </div>
                <div className="team team-b">
                    <div className="team-photos">
                        {teamBImages}
                    </div>
                    <div className="team-meta">
                        {teamBNames}
                    </div>
                </div>
                <div className="match-vs">VS</div>
            </div>
        </MatchCardWrapper>
    )
};

MatchCard.propTypes = {
    match: PropTypes.object,
    teamA: PropTypes.array,
    teamB: PropTypes.array,
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

  .team-meta span{
      display: block;
  }

  .team-b {
      flex-direction: row-reverse;
  }

  .winner {
      background: #AAA;
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
  }
`;

export default MatchCard;