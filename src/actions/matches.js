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

export function acceptMatch(match) {
    // flip the bit on the match and persist
    db.collection('matches').doc(match.id).update({
        accepted: true,
    }).then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        console.error("Error updating document: ", error);
    });
    
    // push the new approved match to each player's matches collection

    // for each player on the match
    match.players.forEach(player => {
        // get the user by id
        const userRef = db.collection('users').doc(player.id);
        const user = userRef.get().then(user => {
            return user;
        });
        // now pull the matches collection
        const playerMatches = user.matches;
        const matchPlayer = match.players.filter(player => player.userId === user.id);
        const oppPlayerA = match.players.filter(player => player.team !== matchPlayer.team);
        
        let teammatePlayer;
        let oppPlayerB;

        if(match.players.length === 4) {
            teammatePlayer = match.players.filter(player => player.team === matchPlayer.team);
            oppPlayerB = match.players.filter(player => player.team !== matchPlayer.team && player.userId !== oppPlayerA.userId);
        }

        // create the new user match
        const userMatchOptions = {
            userId: user.id,
            matchId: match.id,
            matchDate: match.matchDate,
            win: matchPlayer.win,
            teammate: teammatePlayer ? teammatePlayer.userId : null,
            oppPlayerA: oppPlayerA.userId,
            oppPlayerB: oppPlayerB ? oppPlayerB.userId : null,
            team: matchPlayer.team,
            rating: matchPlayer.rating,
            ratingShift: matchPlayer.ratingShift,
        }
        const newUserMatch = new UserMatch(userMatchOptions);
        playerMatches.push(utils.createFirebaseGeneric(newUserMatch));
        // update the record in firebase
        userRef.update({
            matches: playerMatches,
        });
    })
    
}