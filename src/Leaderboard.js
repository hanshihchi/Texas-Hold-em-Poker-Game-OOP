/**
 * @module Leaderboard
 */
import { AccountManager } from './AccountManager.js'; 

/**
 * Aggregates and ranks player accounts by their chip balances.
 */
export class Leaderboard {
  /**
   * Retrieves and sorts all player accounts from the AccountManager.
   * @returns {Array} An array of PlayerAccount objects sorted in descending order by chip balance.
   */
  getRankings() {
    const accountManager = AccountManager.getInstance();
    // Get all accounts (an object mapping player names to PlayerAccount instances)
    const accounts = accountManager.accounts;
    // Convert the accounts object to an array.
    const accountArray = Object.values(accounts);
    // Sort the array by chip balance in descending order.
    accountArray.sort((a, b) => b.chips - a.chips);
    return accountArray;
  }

  /**
   * Returns a formatted string representing the leaderboard.
   * @returns {string} A string where each line represents a ranked player.
   */
  displayLeaderboard() {
    const rankings = this.getRankings();
    return rankings
      .map((account, index) => `${index + 1}. ${account.playerName} - ${account.chips} chips`)
      .join('\n');
  }
}