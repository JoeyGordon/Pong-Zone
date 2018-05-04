import { db } from '../firebase';
import * as teamsActionTypes from '../actionTypes/teams';
import * as Utils from '../utils/utils';

export function setAllTeams(teams) {
    return {
        type: teamsActionTypes.SET_ALL_TEAMS,
        data: teams,
    }
}

export function updateTeams(teams) {
    teams.forEach(team => {
        console.log('WE ARE MAKING TEAMS!')
        const teamRef = db.collection('teams').doc(team.teamId);
        teamRef.get().then((doc) => {
            if(doc.exists){
                teamRef.update({
                    matches: team.matches,
                    rating: team.rating,
                    wins: team.wins,
                    losses: team.losses,
                }).then(()=> {
                    console.log("Document successfully updated!");
                }).catch(function(error) {
                    console.error("Error updating document: ", error);
                });
            }
            else{
                teamRef.set(Utils.createFirebaseGeneric(team))
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.log("Error writing document: ", error);
                })
            }
        })
    });
};
