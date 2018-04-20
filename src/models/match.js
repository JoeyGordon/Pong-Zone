export default class Match {
    constructor(matchOptions) {
        if (matchOptions) {
            if(!matchOptions.createdBy) throw new Error('Cannot create new match without a createdBy userId');
            if(!matchOptions.players) throw new Error('Cannot create new match without players');
            if(!matchOptions.players.length !== 2 && !matchOptions.players.length !== 4) {
                throw new Error('A match must have either 2 or 4 players');
            }
                
            this.createdBy = matchOptions.createdBy;
            this.players = matchOptions.players;
            this.id = matchOptions.id || null;
            this.createdDate = matchOptions.createdDate || new Date();
            this.matchDate = matchOptions.matchDate || new Date();
            this.accepted = matchOptions.accepted || false;
            
        }
    }
}


