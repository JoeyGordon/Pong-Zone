
import * as teamsActionTypes from '../actionTypes/teams';


export function setAllTeams(teams) {
    return {
        type: teamsActionTypes.SET_ALL_TEAMS,
        data: teams,
    }
}
export function addTeam(team) {
    return {
        type: teamsActionTypes.ADD_TEAM,
        data: team,
    }
}

export function updateTeams(teams) {
    return {
        type: teamsActionTypes.UPDATE_TEAMS,
        data: teams,
    }
} 

