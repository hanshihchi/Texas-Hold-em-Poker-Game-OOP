/**
 * @module GameState
 */

/**
 * Singleton to manage the overall game state.
 */
export default class GameState {
  constructor() {
    if (GameState.instance) {
      return GameState.instance;
    }
    this.currentGame = null;
    this.activePlayers = [];
    this.roundNumber = 0;
    this.gamePhase = 'pre-flop';
    GameState.instance = this;
  }

  /**
   * Gets the singleton instance.
   * @returns {GameState}
   */
  static getInstance() {
    if (!GameState.instance) {
      GameState.instance = new GameState();
    }
    return GameState.instance;
  }

  /**
   * Resets the game state for a new game.
   */
  resetGame() {
    this.currentGame = null;
    this.activePlayers = [];
    this.roundNumber = 0;
    this.gamePhase = 'pre-flop';
  }

  /**
   * Updates the current game phase.
   * @param {string} phase
   */
  updatePhase(phase) {
    this.gamePhase = phase;
  }

  /**
   * Updates the list of active players (i.e., players that haven't folded).
   * @param {Player[]} players
   */
  updateActivePlayers(players) {
    // Only include players that have not folded.
    this.activePlayers = players.filter(p => !p.folded);
  }

  /**
   * Checks whether the game should end.
   * The game ends when the phase is 'showdown' or only one active player remains.
   * @returns {boolean}
   */
  checkEndConditions() {
    console.log(`Phase: ${this.gamePhase}, Active players: ${this.activePlayers.length}`);
    return this.gamePhase === 'showdown' || this.activePlayers.length <= 1;
  }
}