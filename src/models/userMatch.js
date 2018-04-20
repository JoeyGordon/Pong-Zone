export default class Match {
    constructor(userMatchOptions) {
        if (userMatchOptions) {
            if(!userMatchOptions.userId ||
                !userMatchOptions.matchId ||
                !userMatchOptions.matchDate ||
                !userMatchOptions.win ||
                (!userMatchOptions.oppPlayerA && !userMatchOptions.oppPlayerB) ||
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
            this.oppPlayerA = userMatchOptions.oppPlayerA || null;
            this.oppPlayerB = userMatchOptions.oppPlayerB || null;
        }
    }
}


