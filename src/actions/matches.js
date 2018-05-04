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

export function recordMatch(players, isDoubles, createdBy, matchDate = new Date()) {
    const options = { players, isDoubles, matchDate, createdBy }
    const newMatch = new Match(options);
    const newMatchRecord = utils.createFirebaseGeneric(newMatch);

    let newMatchId;
    return db.collection("matches").add(newMatchRecord)
    .then(function(result) {
        console.log("Document successfully written!");
        newMatchId = result.id;
        newMatch.matchId = newMatchId;
        newMatch.accepted = true;
        // flip the bit on the match and persist
        const matchRef = db.collection('matches').doc(newMatchId);
        matchRef.update({
            accepted: true,
            matchId: newMatchId,
        }).then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        });
        
        // push the new approved match to each player's matches collection

        matchRef.get().then((response) => {
                    // for each player on the match
            const match = response.data();
            match.players.forEach(player => {
                // get the user by id
                const userRef = db.collection('users').doc(player.userId);
                userRef.get().then(response => {

                    const user = response.data();
                    user.userId = response.id;
                    // now pull the matches collection
                    const playerMatches = user.matches;
                    const matchPlayer = match.players.find(player => player.userId === user.userId);
                    const opponents = match.players.filter(player => 
                        player.team !== matchPlayer.team).map(player => {
                            return player.userId
                        });
                    
                    let teammatePlayer;

                    if(match.players.length > 2) {
                        teammatePlayer = match.players.find(player => player.team === matchPlayer.team && player.userId !== matchPlayer.userId);
                    }

                    // create the new user match
                    const userMatchOptions = {
                        userId: user.userId,
                        matchId: newMatchId,
                        matchDate: match.matchDate,
                        win: matchPlayer.win,
                        teammate: teammatePlayer ? teammatePlayer.userId : null,
                        opponents: opponents,
                        team: matchPlayer.team,
                        rating: matchPlayer.rating,
                        ratingShift: matchPlayer.ratingShift,
                    }
                    const newUserMatch = new UserMatch(userMatchOptions);
                    playerMatches.push(utils.createFirebaseGeneric(newUserMatch));

                    const wins = user.wins + 1;
                    // update the record in firebase
                    userRef.update({
                        matches: playerMatches,
                        rating: matchPlayer.rating,
                        wins: wins,
                    });
                });
                
            })
        });

        }).then(()=> {
            return Promise.resolve(newMatch);
        })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

export function acceptMatch(match) {

    
}