import { db } from '../firebase';
import Match from "../models/match";
import UserMatch from '../models/userMatch';
import * as utils from '../utils/utils';
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

export function recordMatch(match) {
    db.collection('matches').doc(match.matchId).set(utils.createFirebaseGeneric(match))
    .then(function(result) {
        console.log("Match successfully written!");  
    })
    .catch(function(error) {
        console.error("Error writing Match: ", error);
    });
}

export function acceptMatch(match) {

    
}