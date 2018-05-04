import { isNumber } from "util";

export default class DoublesTeamMatch {
    constructor(matchDoublesTeamOptions) {
        if (matchDoublesTeamOptions) {
            if(!matchDoublesTeamOptions.teamId) throw new Error('Cannot create new match doubles team without a teamId');
            if(!matchDoublesTeamOptions.matchId) throw new Error('Cannot create new match doubles team without a matchId');
            if(!isNumber(matchDoublesTeamOptions.rating)) throw new Error('Player must have a rating');
            if(!isNumber(matchDoublesTeamOptions.ratingShift)) throw new Error('Player must have a rating shift');
                                
            this.teamId = matchDoublesTeamOptions.userId;
            this.matchId = matchDoublesTeamOptions.matchId;
            this.win = matchDoublesTeamOptions.win || false;
            this.rating = matchDoublesTeamOptions.rating;
            this.ratingShift = matchDoublesTeamOptions.ratingShift;
        }
    }
}


