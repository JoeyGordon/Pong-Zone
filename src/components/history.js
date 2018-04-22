import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

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
        <div>
            <h1>History</h1>
            {matchesArray}
        </div>
    )
}

const mapStateToProps = state => ({
    matches: state.matches,
    users: state.users,
});

export default connect(mapStateToProps)(History);