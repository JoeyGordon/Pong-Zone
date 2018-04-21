import { isNumber } from "util";

export default class MatchPlayer {
    constructor(matchPlayerOptions) {
        if (matchPlayerOptions) {
            if(!matchPlayerOptions.userId) throw new Error('Cannot create new match player without a userId');
            if(!matchPlayerOptions.team) throw new Error('Cannot create new match without players');
            if(!isNumber(matchPlayerOptions.rating)) throw new Error('Player must have a rating');
            if(!isNumber(matchPlayerOptions.ratingShift)) throw new Error('Player must have a rating shift');
                                
            this.userId = matchPlayerOptions.userId;
            this.win = matchPlayerOptions.win;
            this.team = matchPlayerOptions.team;
            this.rating = matchPlayerOptions.rating;
            this.ratingShift = matchPlayerOptions.ratingShift;
        }
    }
}


