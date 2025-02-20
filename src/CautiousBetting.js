/**
 * @module CautiousBetting
 */
import BettingStrategy from './BettingStrategy.js';

/**
 * Represents a cautious betting strategy.
 * @extends BettingStrategy
 */
export default class CautiousBetting extends BettingStrategy {
  /**
   * Makes a cautious betting decision.
   * An AI decision-maker who isn't willing to take risks.
   * @param {object} gameState - The current game state.
   * @returns {string} The decision ("fold" or "check").
   */
  makeDecision(gameState) {
    console.log('Make a cautious bet.');
    return 'check';
  }
}