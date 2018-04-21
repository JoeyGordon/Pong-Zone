export default class UserMatch {
    constructor(userMatchOptions) {
        if (userMatchOptions) {
            if(!userMatchOptions.userId ||
                !userMatchOptions.matchId ||
                !userMatchOptions.matchDate ||
                !userMatchOptions.win ||
                userMatchOptions.opponents.length < 1 || userMatchOptions.opponents.length > 2 || 
                !userMatchOptions.team ||
                !userMatchOptions.rating ||
                !userMatchOptions.ratingShift
            ) {
                throw new Error('userMatch options are invalid. Cannot create userMatch');
            }
                
            this.userId = userMatchOptions.userId;
            this.matchId = userMatchOptions.matchId;
            this.matchDate = userMatchOptions.matchDate;
            this.win = userMatchOptions.win;
            this.teammate = userMatchOptions.teammate;
            this.team = userMatchOptions.team;
            this.rating = userMatchOptions.rating;
            this.ratingShift = userMatchOptions.ratingShift;
            this.opponents = userMatchOptions.opponents;
        }
    }
}


