import * as utils from '../utils/utils';
import Match from './match';
import UserMatch from './userMatch';

export default class User {
    id: string;
    name: string;
    email: string;
    createdDate: Date;
    matches: Match[];
    rating: number;
    wins: number;
    losses: number;
    photoURL: string;

    constructor(userOptions) {
        if (!userOptions.displayName && !userOptions.name) throw new Error('Cannot create new user without displayName');
        if (!userOptions.email) throw new Error('Cannot create new user without email');

        this.id = userOptions.id || utils.getId();
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


