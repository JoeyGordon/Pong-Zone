import { db } from '../firebase';
import Match from "../models/match";
import * as utils from '../utils/utils';

export function recordMatch(players, createdBy, matchDate = new Date()) {
    console.log('createdBy', createdBy);
    const options = { players, matchDate, createdBy }
    console.log('options', options);
    const newMatch = new Match(options);
    const testMatch = utils.createFirebaseGeneric(newMatch);
    console.log('TEST MATCH', testMatch);

    // Add a new document in collection "cities"
    db.collection("matches").add(testMatch)
    .then(function(result) {
        console.log("Document successfully written!");
        console.log('RESULT', result);
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

}