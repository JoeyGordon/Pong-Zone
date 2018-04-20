export default class MatchPlayer {
    constructor(matchPlayerOptions) {
        if (matchPlayerOptions) {
            if(!matchPlayerOptions.userId) throw new Error('Cannot create new match player without a userId');
            if(!matchPlayerOptions.team) throw new Error('Cannot create new match without players');
            if(!matchPlayerOptions.rating) throw new Error('Player must have a rating');
                
            this.userId = matchPlayerOptions.userId;
            this.team = matchPlayerOptions.team;
            this.rating = matchPlayerOptions.rating;
        }
    }
}


