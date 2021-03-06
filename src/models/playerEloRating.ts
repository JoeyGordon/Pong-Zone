const k = 16;
const q = (x) => Math.pow(10, (x / 400));
const eA = (x, y) => q(x) / (q(x) + q(y));

export default class PlayerEloRating {
    private shift: number;

    constructor(private eloRating: number) {
        this.eloRating = eloRating;
        this.shift = 0;
    }

    ratingShift(winLoss: boolean, oppPlayerEloRating: PlayerEloRating) {
        const eloRating = this.eloRating;
        const shift = Math.round(k * (Number(winLoss) - eA(eloRating, oppPlayerEloRating.getEloRating())));

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
