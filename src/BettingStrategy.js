/**
 * @module BettingStrategy
 */

/**
 * Abstract class representing a betting strategy.
 * @abstract
 */
export default class BettingStrategy {
    /**
     * Abstract method to make a betting decision.
     * @param {object} gameState - The current game state.
     * @returns {string} The betting decision.
     * @abstract
     */
    makeDecision(gameState) {
      throw new Error('makeDecision() must be implemented');
    }
  }