/**
 * @module BettingRound
 */

/**
 * Manages a betting round within a game phase.
 */
export class BettingRound {
    constructor() {
      this.currentBet = 0;
      this.playersInRound = [];
    }
  
    /**
     * Processes a player's bet.
     * @param {object} player - The player placing the bet.
     * @param {number} amount - The bet amount.
     */
    placeBet(player, amount) {
      this.currentBet = amount;
      // Process bet for the player (additional logic could go here)
      console.log(`${player.name} placed a bet of ${amount}`);
    }
  
    /**
     * Processes all player actions in this round.
     */
    processActions() {
      // Logic to process all bets and actions in this round
      console.log('Processing player actions in this round...');
    }
  }