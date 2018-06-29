import { db } from '../firebase';
import * as utils from '../utils/utils';
import UserMatch from '../models/userMatch';
import Match from '../models/match';

export function updateUsersWithMatch(match: Match) {
    match.players.forEach(player => {
        // get the user by id
        const userRef = db.collection('users').doc(player.id);
        userRef.get().then(response => {
            const user = response.data();

            // now pull the matches collection
            const playerMatches = user.matches;
            const matchPlayer = match.players.find(player => player.id === user.id);
            const opponents = match.players.filter(player =>
                player.team !== matchPlayer.team).map(player => {
                    return player.id
                });

            let teammatePlayer;

            if (match.players.length > 2) {
                teammatePlayer = match.players.find(player => player.team === matchPlayer.team && player.id !== matchPlayer.id);
            }

            // create the new user match
            const userMatchOptions = {
                id: user.id,
                matchId: match.matchId,
                matchDate: match.matchDate,
                win: matchPlayer.win,
                teammate: teammatePlayer ? teammatePlayer.id : null,
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

    });
}