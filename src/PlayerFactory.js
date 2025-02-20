/**
 * @module PlayerFactory
 */
import HumanPlayer from './HumanPlayer.js';
import ComputerPlayer from './ComputerPlayer.js';
import BalancedBetting from './BalancedBetting.js';

/**
 * Factory for creating players.
 */
export default class PlayerFactory {
  /**
   * Creates a player based on type.
   * @param {string} type - "human" or "computer".
   * @param {string} name - The player's name.
   * @param {object} [strategy] - Optional betting strategy for computer players.
   * @returns {Player} A new HumanPlayer or ComputerPlayer.
   */
  static createPlayer(type, name, strategy) {
    if (type === 'human') {
      return new HumanPlayer(name);
    } else if (type === 'computer') {
      // Use BalancedBetting as the default if no strategy is provided.
      return new ComputerPlayer(name, strategy || new BalancedBetting());
    } else {
      throw new Error('Unknown player type');
    }
  }
}