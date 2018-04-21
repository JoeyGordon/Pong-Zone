import { db } from '../firebase';
import Match from "../models/match";
import * as utils from '../utils/utils';
import * as matchActionTypes from '../actionTypes/matches';

export function setMatches(matches) {
    return {
        type: matchActionTypes.SET_MATCHES,
        data: matches,
    }
}

export function recordMatch(players, createdBy, matchDate = new Date()) {
    const options = { players, matchDate, createdBy }
    const newMatch = new Match(options);
    const newMatchRecord = utils.createFirebaseGeneric(newMatch);

    db.collection("matches").add(newMatchRecord)
    .then(function(result) {
        console.log("Document successfully written!");
        console.log('RESULT', result);
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}