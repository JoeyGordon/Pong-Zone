import PlayerEloRating from "../../models/playerEloRating";
import { expect } from 'chai';
import 'mocha';

it('rating shift', () => {
    // Arrange
    const playerEloRating = new PlayerEloRating(0);

    // Act
    playerEloRating.ratingShift(true, playerEloRating);

    // Assert
    expect(playerEloRating.getEloRating()).to.equal(8);
});