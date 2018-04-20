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

        const newEloRating = eloRating + shift;
        privateData.set(this, {
            eloRating: newEloRating < 0 ? 0 : newEloRating,
            shift
        });
    }

    getEloRating() {
        return privateData.get(this).eloRating;
    };

    getShift() {
        return privateData.get(this).shift;
    };
}
