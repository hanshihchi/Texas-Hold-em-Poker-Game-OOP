/**
 * @module HumanPlayer
 */
import { Player } from './Player.js';
import { AccountManager } from './AccountManager.js';

/**
 * Represents a human player.
 * @extends Player
 */
export class HumanPlayer extends Player {
  /**
   * @param {string} name - The player's name.
   */
  constructor(name) {
    super(name);
    // Link the human player to their persistent account.
    this.account = AccountManager.getInstance().getPlayerAccount(name);
  }

  /**
   * Prompts the human player for an action (abstraction example).
   * @param {object} gameState - The current game state.
   * @returns {string} The chosen action.
   */
  makeDecision(gameState) {
    // For demonstration purposes, we'll just return a fixed value.
    return 'call';
  }

  /**
   * Places a bet and updates the account (encapsulation example).
   * @param {number} amount - The bet amount.
   */
  placeBet(amount) {
    if (this.account.chips >= amount) {
      this.account.deductChips(amount);
    } else {
      throw new Error('Not enough chips');
    }
  }
}