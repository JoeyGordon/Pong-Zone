import User from "./user";

export default class UserMatch {
    userId: string;
    matchId: string;
    matchDate: Date;
    win: boolean;
    teammate: User;
    team: string;
    rating: number;
    ratingShift: number;
    opponents: Array<User>;

    constructor(userMatchOptions) {
        if (userMatchOptions) {
            if(!userMatchOptions.userId) throw new Error('Bad user id');
            if(!userMatchOptions.matchId) throw new Error('Bad match id');
            if(!userMatchOptions.matchDate) throw new Error('Bad match date');
            if(userMatchOptions.opponents.length < 1 || userMatchOptions.opponents.length > 2) throw new Error('Bad opponents array');
            if(!userMatchOptions.team) throw new Error('Bad team prop');
            if(!(userMatchOptions.rating >= 0))  throw new Error('Bad rating');
            if(!Number.isInteger(userMatchOptions.ratingShift)) throw new Error('Bad rating shift');
                
            this.userId = userMatchOptions.userId;
            this.matchId = userMatchOptions.matchId;
            this.matchDate = userMatchOptions.matchDate;
            this.win = userMatchOptions.win || false;
            this.teammate = userMatchOptions.teammate;
            this.team = userMatchOptions.team;
            this.rating = userMatchOptions.rating;
            this.ratingShift = userMatchOptions.ratingShift;
            this.opponents = userMatchOptions.opponents;
        }
    }
}


