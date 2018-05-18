import PlayerEloRating from "./playerEloRating";

const k = 16;
const q = (x) => Math.pow(10, (x / 400));
const eA = (x, y) => q(x) / (q(x) + q(y));

export default class TeamEloRating {
    private eloRating: number;
    private shift: number;

    constructor(eloRatingA: PlayerEloRating, eloRatingB: PlayerEloRating) {
        let combinedEloRating = Math.round((eloRatingA.getEloRating() + eloRatingB.getEloRating()) / 2);

        this.eloRating = combinedEloRating;
        this.shift = 0;
    }

    static createTeamEloRatingFromNumber(eloRating: number){
        return new TeamEloRating(new PlayerEloRating(eloRating), new PlayerEloRating(eloRating));
    }

    ratingShift(winLoss: boolean, otherTeamRating: TeamEloRating) {
        const eloRating = this.eloRating;
        const shift = Math.round(k * (Number(winLoss) - eA(eloRating, otherTeamRating.getEloRating())));

        this.shift = shift;
    }

    getEloRating() {
        const newEloRating = this.eloRating + this.shift;
        return newEloRating < 0 ? 0 : newEloRating;
    };

    getShift() {
        return this.shift;
    };
}
