/**
 * @module ComputerPlayer
 */
import { Player } from './Player.js';

/**
 * Represents a computer-controlled player.
 * @extends Player
 */
export class ComputerPlayer extends Player {
  /**
   * @param {string} name - The computer player's name.
   * @param {object} bettingStrategy - An instance of a BettingStrategy.
   */
  constructor(name, bettingStrategy) {
    super(name);
    this.bettingStrategy = bettingStrategy;
  }

  /**
   * Uses the betting strategy to make a decision (polymorphism example).
   * @param {object} gameState - The current game state.
   * @returns {string} The chosen action.
   */
  makeDecision(gameState) {
    return this.bettingStrategy.makeDecision(gameState);
  }
}