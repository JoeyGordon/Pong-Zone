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

    let newMatchId;
    db.collection("matches").add(newMatchRecord)
    .then(function(result) {
        console.log("Document successfully written!");
        newMatchId = result.id;

        // flip the bit on the match and persist
        const matchRef = db.collection('matches').doc(newMatchId);
        matchRef.update({
            accepted: true,
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
                    console.log('USER', user);
                    // now pull the matches collection
                    const playerMatches = user.matches;
                    const matchPlayer = match.players.find(player => player.userId === user.userId);
                    console.log('Match Player', matchPlayer);
                    console.log('Match Players', match.players);
                    const opponents = match.players.filter(player => 
                        player.team !== matchPlayer.team).map(player => {
                            return player.userId
                        });
                    
                    let teammatePlayer;

                    if(match.players.length > 2) {
                        teammatePlayer = match.players.find(player => player.team === matchPlayer.team && player.userId !== matchPlayer.userId);
                    }

                    console.log('teammate player', teammatePlayer);
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
                    console.log('USER MATCH OPTIONS', userMatchOptions);
                    const newUserMatch = new UserMatch(userMatchOptions);
                    playerMatches.push(utils.createFirebaseGeneric(newUserMatch));
                    // update the record in firebase
                    userRef.update({
                        matches: playerMatches,
                        rating: matchPlayer.rating,
                    });
                });
                
            })
        });

            
        })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

export function acceptMatch(match) {

    
}