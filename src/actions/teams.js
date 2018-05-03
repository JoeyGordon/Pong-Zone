import * as teamsActionTypes from '../actionTypes/teams';

export function setAllTeams(teams) {
    return {
        type: teamsActionTypes.SET_ALL_TEAMS,
        data: teams,
    }
}
