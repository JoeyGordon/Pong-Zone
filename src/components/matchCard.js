import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MatchCard = (props) => {
    return (
        <MatchCardWrapper>
            <div className="match-card">
                <div className="team team-a winner">
                    <div className="team-photos">
                        <img src="http://via.placeholder.com/60x60" alt="" />
                        <img src="http://via.placeholder.com/60x60" alt="" />
                    </div>
                    <div className="team-meta">
                        Joey Gordon
                    </div>
                </div>
                <div className="team team-b">
                    <div className="team-photos">
                        <img src="http://via.placeholder.com/60x60" alt="" />
                        <img src="http://via.placeholder.com/60x60" alt="" />
                    </div>
                    <div className="team-meta">
                        Anthony Zavala
                    </div>
                </div>
                <div className="match-vs">VS</div>
            </div>
        </MatchCardWrapper>
    )
};

MatchCard.propTypes = {
    match: PropTypes.object,
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