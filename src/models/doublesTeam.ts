import User from "./user";
import Match from "./match";

export default class DoublesTeam {
    teamId: string;
    members: Array<User>;
    matches: Array<Match>;
    rating: number;
    wins: number;
    losses: number;

    constructor(doublesTeamOptions) {
        if (doublesTeamOptions) {
            if (!doublesTeamOptions.teamId) throw new Error('Cannot create new doubles team without teamId');
            if (!(doublesTeamOptions.members.length === 2)) throw new Error('You must have 2 players for a doubles team');
            if (!doublesTeamOptions.matches) throw new Error('Doubles team must contain a match history collection, even if empty');

            this.teamId = doublesTeamOptions.teamId;
            this.members = doublesTeamOptions.members;
            this.matches = doublesTeamOptions.matches;
            this.rating = doublesTeamOptions.rating || 0;
            this.wins = doublesTeamOptions.wins || 0;
            this.losses = doublesTeamOptions.losses || 0;
        }
    }
}


