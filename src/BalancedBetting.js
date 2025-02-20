/**
 * @module BalancedBetting
 */
import BettingStrategy from './BettingStrategy.js';

/**
 * Represents a balanced betting strategy.
 * @extends BettingStrategy
 */
export default class BalancedBetting extends BettingStrategy {
  /**
   * Makes a balanced betting decision.
   * An AI decision-maker who balances risk-taking.
   * @param {object} gameState - The current game state.
   * @returns {string} The decision ("call").
   */
  makeDecision(gameState) {
    console.log('Make a balanced bet.');
    return 'call';
  }
}