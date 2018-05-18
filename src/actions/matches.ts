import * as matchActionTypes from '../actionTypes/matches';

export function setMatches(matches) {
    return {
        type: matchActionTypes.SET_MATCHES,
        data: matches,
    }
}

export function addMatch(match) {
    return {
        type: matchActionTypes.ADD_MATCH,
        data: match,
    }
}

