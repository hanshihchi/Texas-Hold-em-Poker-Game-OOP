/**
 * @module AccountManager
 */
import PlayerAccount from './PlayerAccount.js';

/**
 * Manages all human player accounts.
 * @singleton
 */
export default class AccountManager {
  constructor() {
    if (AccountManager.instance) {
      return AccountManager.instance;
    }
    /**
     * A collection of player accounts, indexed by player name.
     * @type {Object.<string, PlayerAccount>}
     */
    this.accounts = {};
    AccountManager.instance = this;
  }

  /**
   * Gets the singleton instance.
   * @returns {AccountManager}
   */
  static getInstance() {
    if (!AccountManager.instance) {
      AccountManager.instance = new AccountManager();
    }
    return AccountManager.instance;
  }

  /**
   * Creates an account for a new player.
   * @param {string} playerName - The name of the player.
   * @param {string} email - The player's email address.
   * @param {string} password - The player's password.
   * @param {string} birthday - The player's birth date (e.g., "YYYY-MM-DD").
   * @param {number} [initialChips=10000] - Initial chip balance (optional, defaults to 10000).
   * @throws {Error} If the player is under 21 years old.
   */
  createAccount(playerName, email, password, birthday, initialChips = 10000) {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 21) {
      throw new Error('Player must be at least 21 years old');
    }
    if (!this.accounts[playerName]) {
      this.accounts[playerName] = new PlayerAccount(playerName, email, password, birthday, initialChips);
    }
  }

  /**
   * Retrieves a player's account.
   * @param {string} playerName - The name of the player.
   * @returns {PlayerAccount|null} - The player's account, or null if not found.
   */
  getPlayerAccount(playerName) {
    return this.accounts[playerName] || null;
  }

  /**
   * Updates a player's chip balance.
   * @param {string} playerName - The name of the player.
   * @param {number} amount - Positive to add, negative to deduct.
   */
  updateChips(playerName, amount) {
    const account = this.getPlayerAccount(playerName);
    if (account) {
      if (amount > 0) {
        account.addChips(amount);
      } else {
        account.deductChips(Math.abs(amount));
      }
    }
  }

  /**
   * Saves a game result for a player.
   * @param {string} playerName - The name of the player.
   * @param {string} gameID - The unique identifier of the game.
   * @param {string} dateTime - The date and time of the game
   * @param {number} numPlayers - The total number of players in the game.
   * @param {number} finalWinLoss - The player's final win/loss amount in chips.
   */
  saveGameResult(playerName, gameID, dateTime, numPlayers, finalWinLoss) {
    const account = this.getPlayerAccount(playerName);
    if (account) {
      account.saveGameResult(gameID, dateTime, numPlayers, finalWinLoss);
    }
  }
}