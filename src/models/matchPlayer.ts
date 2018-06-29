import { isNumber } from "util";

export default class MatchPlayer {
    id: string;
    win: boolean;
    team: string;
    rating: number;
    ratingShift: number;

    constructor(matchPlayerOptions) {
        if (matchPlayerOptions) {
            if (!matchPlayerOptions.id) throw new Error('Cannot create new match player without a id');
            if (!matchPlayerOptions.team) throw new Error('Cannot create new match without players');
            if (!isNumber(matchPlayerOptions.rating)) throw new Error('Player must have a rating');
            if (!isNumber(matchPlayerOptions.ratingShift)) throw new Error('Player must have a rating shift');

            this.id = matchPlayerOptions.id;
            this.win = matchPlayerOptions.win;
            this.team = matchPlayerOptions.team;
            this.rating = matchPlayerOptions.rating;
            this.ratingShift = matchPlayerOptions.ratingShift;
        }
    }
}


