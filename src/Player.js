/**
 * @module Player
 */

/**
 * Abstract class representing a generic player.
 * @abstract
 */
export default class Player {
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

    /**
     * Player folds their hand.
     */
    fold() {
        this.folded = true;
    }

    /**
     * Player checks their hand.  
     * @returns {string} The action 'check'.
     */
    check() {
        return 'check';
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