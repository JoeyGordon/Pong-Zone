const k = 16;
const q = (x) => Math.pow(10, (x / 400));
const eA = (x, y) => q(x) / (q(x) + q(y));
const privateData = new WeakMap();

export default class TeamEloRating {
    constructor(eloRatingA, eloRatingB = null) {
        let combinedEloRating = eloRatingB ? (eloRatingA.getEloRating() + eloRatingB.getEloRating()) / 2 : eloRatingA;
        privateData.set(this, {
            eloRating: combinedEloRating,
            shift: 0,
        });
    }

    combineEloRating(eloRatingA, eloRatingB) {
        return 
    }

    ratingShift(winLoss, otherTeamRating) {
        const eloRating = privateData.get(this).eloRating;
        const shift = Math.round(k * (Number(winLoss) - eA(eloRating, otherTeamRating.getEloRating())));

        const newEloRating = eloRating + shift;
        privateData.set(this, {
            eloRating: newEloRating < 0 ? 0 : newEloRating,
            shift
        });
    }

    getEloRating() {
        const newEloRating = privateData.get(this).eloRating + privateData.get(this).shift;
        return newEloRating < 0 ? 0 : newEloRating;
    };

    getShift() {
        return privateData.get(this).shift;
    };
}
