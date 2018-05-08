import { db } from '../firebase';
import * as utils from '../utils/utils';
import UserMatch from '../models/userMatch';

export function updateUsersWithMatch(match) {
    match.players.forEach(player => {
        // get the user by id
        const userRef = db.collection('users').doc(player.userId);
        userRef.get().then(response => {

            const user = response.data();

            // until we reboot the user db, we will lack userIds on the users
            if(!user.userId){
                user.userId = response.id;
            }
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
                matchId: match.matchId,
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
        
    });
}