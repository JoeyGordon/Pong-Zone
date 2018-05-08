import { db } from '../firebase';
import * as Utils from '../utils/utils';

export function updateTeams(teams) {
    teams.forEach(team => {
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
