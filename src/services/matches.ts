import { db } from '../firebase';
import * as utils from '../utils/utils';

export function recordMatch(match) {
    db.collection('matches').doc(match.matchId).set(utils.createFirebaseGeneric(match))
        .then(function (result) {
            console.log("Match successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing Match: ", error);
        });
}

export function acceptMatch(match) {


}