import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import MatchCard from './matchCard';



const History = (props) => {
    const matchesArray = props.matches.map(match => {
        const teamA = _.filter(match.players, ['team', 'A']);
        const teamB = _.filter(match.players, ['team', 'B']);

        const teamAUsers = teamA.map(player => {
            return _.find(props.users, ['userId', player.userId])
        })

        const teamBUsers = teamB.map(player => {
            return _.find(props.users, ['userId', player.userId])
        })

        return (
            <MatchCard match={match} teamA={teamAUsers} teamB={teamBUsers} key={match.matchId} />
        )
    });

    return (
        <HistoryWrapper>
            <div className="page-header">
                <h1>Match History</h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polygon fill="white" points="0,100 100,0 100,100" />
                </svg>
            </div>

            <div className="page-content">
                {matchesArray}
            </div>
        </HistoryWrapper>
    )
}

const mapStateToProps = state => ({
    matches: state.matches,
    users: state.users,
});

const HistoryWrapper = styled.div`
    .page-content {
        background: transparent;
        padding: 0;
        box-shadow: none;
        top: -218px;
    }
`;

export default connect(mapStateToProps)(History);