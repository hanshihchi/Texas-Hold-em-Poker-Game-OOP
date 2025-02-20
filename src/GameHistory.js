/**
 * @module GameHistory
 */

/**
 * Represents a record of a single game's result.
 */
export default class GameHistory {
    /**
     * @param {string} gameID - The unique game identifier.
     * @param {string} dateTime - When the game was played.
     * @param {number} numPlayers - The number of AI players.
     * @param {number} finalWinLoss - Net chips won (+) or lost (-).
     */
    constructor(gameID, dateTime, numPlayers, finalWinLoss) {
      this.gameID = gameID;
      this.dateTime = dateTime;
      this.numPlayers = numPlayers;
      this.finalWinLoss = finalWinLoss;
    }
  
    /**
     * Returns a string representation of the game history record.
     * @returns {string}
     */
    toString() {
      return `Game: ${this.gameID}| Date: ${this.dateTime}| Total Players: ${this.numPlayers}| Win/Loss: ${this.finalWinLoss}`;
    }
  }