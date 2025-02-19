/**
 * @module Player
 */

/**
 * Abstract class representing a generic player.
 * @abstract
 */
export class Player {
    /**
     * @param {string} name - The player's name.
     */
    constructor(name) {
      if (new.target === Player) {
        throw new TypeError('Cannot construct Player instances directly');
      }
      this.name = name;
      this.chips = 0;
      this.hand = [];
      this.folded = false;
    }
  
    /**
     * Deducts chips for a bet.
     * @param {number} amount - The bet amount.
     */
    placeBet(amount) {
      this.chips -= amount;
    }

    fold() {
        this.folded = true;
    }
  
    /**
     * Abstract method for making a decision.
     * @abstract
     * @param {object} gameState - The current game state.
     * @returns {string} The chosen action.
     */
    makeDecision(gameState) {
      throw new Error('makeDecision() must be implemented by subclasses');
    }
  }