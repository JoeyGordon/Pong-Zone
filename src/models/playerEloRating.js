const k = 16;
const q = (x) => Math.pow(10, (x / 400));
const eA = (x, y) => q(x) / (q(x) + q(y));
const privateData = new WeakMap();

export default class PlayerEloRating {
    constructor(eloRating) {
        privateData.set(this, {
            eloRating,
            shift: 0,
        });
    }

    ratingShift(winLoss, oppPairPlayerAEloRating, oppPairPlayerBEloRating) {
        const otherTeamRating = oppPairPlayerBEloRating ?
            (oppPairPlayerAEloRating.getEloRating() + oppPairPlayerBEloRating.getEloRating()) / 2 :
            oppPairPlayerAEloRating.getEloRating();
        const eloRating = privateData.get(this).eloRating;
        const shift = Math.round(k * (Number(winLoss) - eA(eloRating, otherTeamRating)));

        privateData.set(this, {
            ...privateData.get(this),
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
