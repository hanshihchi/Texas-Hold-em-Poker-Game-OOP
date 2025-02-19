/**
 * @module AggressiveBetting
 */
import { BettingStrategy } from './BettingStrategy.js';

/**
 * Represents an aggressive betting strategy.
 * @extends BettingStrategy
 */
export class AggressiveBetting extends BettingStrategy {
  /**
   * Makes an aggressive betting decision.
   * An AI decision-maker willing to take risks
   * @param {object} gameState - The current game state.
   * @returns {string} The decision ("raise").
   */
  makeDecision(gameState) {
    console.log('Make an aggressive bet.');
    return 'raise';
  }
}