const k = 16;
const q = (x) => Math.pow(10, (x / 400));
const eA = (x, y) => q(x) / (q(x) + q(y));
const privateData = new WeakMap();

export default class PlayerEloRating {
    constructor(eloRating) {
        privateData.set(this, {
            eloRating
        });
    }

    playerVsPlayerRatingShift(otherPlayerRating, winLoss) {
        const eloRating = privateData.get(this).eloRating;
        const shift = Math.round(k * (winLoss - eA(eloRating, otherPlayerRating)));

        const newEloRating = eloRating + shift;
        privateData.set(this, {
            eloRating: newEloRating < 0 ? 0 : newEloRating
        });

        return shift;
    }

    playerVsTeamRatingShift(oppPairPlayerARating, oppPairPlayerBRating, winLoss) {
        const shift = this.playerVsPlayerRatingShift((oppPairPlayerARating + oppPairPlayerBRating) / 2, winLoss);
        return shift;
    }

    getEloRating() {
        return privateData.get(this).eloRating;
    };
}
