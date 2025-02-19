/**
 * @module GameRoom
 */
import { PlayerFactory } from './PlayerFactory.js';
import { Game } from './Game.js';
import { CautiousBetting } from './CautiousBetting.js';
import { BalancedBetting } from './BalancedBetting.js';
import { AggressiveBetting } from './AggressiveBetting.js';

/**
 * Handles pre-game configuration and AI customization.
 */
export class GameRoom {
  constructor() {
    this.numAIPlayers = 0;
    this.aiPlayers = [];
    // Default difficulty: "Medium"(BalancedBetting)
    this.gameDifficulty = 'Medium';
  }

  /**
   * Sets the number of AI players and creates them.
   * @param {number} count
   */
  setAIPlayers(count) {
    this.numAIPlayers = count;
    this.aiPlayers = [];
    for (let i = 0; i < count; i++) {
      let strategy;
      switch (this.gameDifficulty) {
        case 'Easy':
          strategy = new CautiousBetting();
          break;
        case 'Hard':
          strategy = new AggressiveBetting();
          break;
        case 'Medium':
        default:
          strategy = new BalancedBetting();
          break;
      }
      const aiPlayer = PlayerFactory.createPlayer('computer', `AI_Player_${i + 1}`, strategy);
      this.aiPlayers.push(aiPlayer);
    }
  }

  /**
   * Modifies the betting strategy for a specific AI player.
   * @param {number} playerIndex
   * @param {string} strategyType - e.g., "Easy", "Medium", "Hard"
   */
  modifyAIStrategy(playerIndex, strategyType) {
    let strategy;
    switch (strategyType) {
      case 'Easy':
        strategy = new CautiousBetting();
        console.log(`${this.aiPlayers[playerIndex].name} is now using CautiousBetting strategy`);
        break;
      case 'Hard':
        strategy = new AggressiveBetting();
        console.log(`${this.aiPlayers[playerIndex].name} is now using AggressiveBetting strategy`);
        break;
      case 'Medium':
      default:
        strategy = new BalancedBetting();
        console.log(`${this.aiPlayers[playerIndex].name} is now using BalancedBetting strategy`);
        break;
    }
    if (this.aiPlayers[playerIndex]) {
      this.aiPlayers[playerIndex].bettingStrategy = strategy;
    }
  }

  /**
   * Removes an AI player from the game room.
   * @param {number} playerIndex
   */
  removeAIPlayer(playerIndex) {
    if (playerIndex >= 0 && playerIndex < this.aiPlayers.length) {
      this.aiPlayers.splice(playerIndex, 1);
      this.numAIPlayers = this.aiPlayers.length;
    }
  }

  /**
   * Updates the overall game difficulty and updates existing AI players.
   * @param {string} difficulty
   */
  setGameDifficulty(difficulty) {
    this.gameDifficulty = difficulty;
    // Update strategy for all AI players.
    this.aiPlayers.forEach(player => {
      this.modifyAIStrategy(this.aiPlayers.indexOf(player), difficulty);
    });
  }

  /**
   * Starts the game by creating a Game instance.
   * @param {object} humanPlayer - The human player.
   * @returns {Game} The new game instance.
   */
  startGame(humanPlayer) {
    const allPlayers = [humanPlayer, ...this.aiPlayers];
    return new Game(allPlayers);
  }
}
