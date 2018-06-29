import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import MatchCard from './matchCard';
import PageHeader from './pageHeader';
import Match from '../models/match';
import User from '../models/user';

export type HistoryProps = {
    matches?: Match[],
    users?: User[]
  };

const History: React.SFC<HistoryProps> = props => {
    const matchesArray = props.matches.map(match => {
        const teamA = _.filter(match.players, ['team', 'A']);
        const teamB = _.filter(match.players, ['team', 'B']);

        const teamAUsers = teamA.map(player => {
            return _.find(props.users, ['id', player.id])
        })

        const teamBUsers = teamB.map(player => {
            return _.find(props.users, ['id', player.id])
        })

        return (
            <MatchCard match={match} teamA={teamAUsers} teamB={teamBUsers} key={match.matchId} />
        )
    });

    return (
        <HistoryWrapper>
            <PageHeader title="Match History" />

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