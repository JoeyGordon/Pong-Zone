import * as utils from '../utils/utils';
import UserMatch from './userMatch';

export default class Match {
    createdBy: string;
    players: UserMatch[];
    matchId: string;
    createdDate: Date;
    matchDate: Date;
    accepted: boolean;
    isDoublesMatch: boolean;

    constructor(matchOptions) {
        if (matchOptions) {
            if (!matchOptions.createdBy) throw new Error('Cannot create new match without a createdBy userId');
            if (!matchOptions.players) throw new Error('Cannot create new match without players');
            if (matchOptions.players.length !== 2 && matchOptions.players.length !== 4) {
                throw new Error('A match must have either 2 or 4 players');
            }

            const genericPlayers = [];
            matchOptions.players.forEach((player) => {
                genericPlayers.push(utils.createFirebaseGeneric(player));
            });

            this.createdBy = matchOptions.createdBy;
            this.players = genericPlayers;
            this.matchId = utils.getId();
            this.createdDate = matchOptions.createdDate || new Date();
            this.matchDate = matchOptions.matchDate || new Date();
            this.accepted = matchOptions.accepted || true;
            this.isDoublesMatch = matchOptions.isDoubles || false;

        }
    }
}


