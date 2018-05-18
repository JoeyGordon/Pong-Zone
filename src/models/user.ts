import * as utils from '../utils/utils';
import Match from './match';

export default class User {
    userId: string;
    name: string;
    email: string;
    createdDate: Date;
    matches: Array<Match>;
    rating: number;
    wins: number;
    losses: number;
    photoURL: URL;

    constructor(userOptions) {
        if (userOptions) {
            if(!userOptions.displayName && !userOptions.name) throw new Error('Cannot create new user without displayName');
            if(!userOptions.email) throw new Error('Cannot create new user without email');

            this.userId = utils.getId();
            this.name = userOptions.displayName || userOptions.name;
            this.email = userOptions.email;
            this.createdDate = userOptions.createdDate || new Date();
            this.matches = userOptions.matches || [];
            this.rating = userOptions.rating || 0;
            this.wins = userOptions.wins || 0;
            this.losses = userOptions.losses || 0;
            this.photoURL = userOptions.photoURL || '';
        }
    }
}


