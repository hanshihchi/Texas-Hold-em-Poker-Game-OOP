/**
 * @module AccountManager
 */
import { PlayerAccount } from './PlayerAccount.js';

/**
 * Manages all human player accounts.
 * @singleton
 */
export class AccountManager {
  constructor() {
    if (AccountManager.instance) {
      return AccountManager.instance;
    }
    /** @type {{ [playerName: string]: PlayerAccount }} */
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
   * @param {string} playerName
   * @param {string} email
   * @param {string} password
   * @param {string} birthday
   * @param {number} [initialChips=10000]
   */
  createAccount(playerName, email, password, birthday, initialChips = 10000) {
    // Player should be older than 21 to play.
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
   * @param {string} playerName
   * @returns {PlayerAccount|null}
   */
  getPlayerAccount(playerName) {
    return this.accounts[playerName] || null;
  }

  /**
   * Updates a player's chip balance.
   * @param {string} playerName
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
   * @param {string} playerName
   * @param {string} gameID
   * @param {string} dateTime
   * @param {number} numPlayers
   * @param {number} finalWinLoss
   */
  saveGameResult(playerName, gameID, dateTime, numPlayers, finalWinLoss) {
    const account = this.getPlayerAccount(playerName);
    if (account) {
      account.saveGameResult(gameID, dateTime, numPlayers, finalWinLoss);
    }
  }
}