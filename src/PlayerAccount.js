/**
 * @module PlayerAccount
 */
import GameHistory from './GameHistory.js';

/**
 * Stores persistent account data for a human player.
 */
export default class PlayerAccount {
  /**
   * @param {string} playerName - The player's name.
   * @param {string} email - The player's email.
   * @param {string} password - The player's password.
   * @param {string} birthday - The player's birthday.
   * @param {number} [initialChips=10000] - The starting chip balance.
   */
  constructor(playerName, email, password, birthday, initialChips = 10000) {
    this.playerName = playerName;
    this.email = email;
    this.password = password;
    this.birthday = birthday;
    this.chips = initialChips;
    /** @type {GameHistory[]} */
    this.history = [];
  }

  /**
   * Adds chips to the account.
   * @param {number} amount
   */
  addChips(amount) {
    this.chips += amount;
  }

  /**
   * Deducts chips from the account.
   * @param {number} amount
   */
  deductChips(amount) {
    this.chips -= amount;
  }

  /**
   * Saves a game result to the account history.
   * @param {string} gameID
   * @param {string} dateTime
   * @param {number} numPlayers
   * @param {number} finalWinLoss
   */
  saveGameResult(gameID, dateTime, numPlayers, finalWinLoss) {
    const record = new GameHistory(gameID, dateTime, numPlayers, finalWinLoss);
    this.history.push(record);
  }

  /**
   * Returns the player's chip balance
   * @returns {number}
   */
  getChipBalance() {
    return this.chips;
  }

  /**
   * Returns the game history.
   * @returns {GameHistory[]}
   */
  getHistory() {
    return this.history;
  }
}