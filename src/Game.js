/**
 * @module Game
 */
import { GameState } from './GameState.js';
import { Deck } from './Deck.js';
import { BettingRound } from './BettingRound.js';
import { AccountManager } from './AccountManager.js';

/**
 * Manages the overall game flow.
 */
export class Game {
  /**
   * @param {object[]} players - Array of Player instances.
   */
  constructor(players) {
    this.gameID = Math.floor(Math.random() * 1000); // Assume unique game ID
    this.players = players; // Aggregation: a game is composed of 2..* players
    this.deck = new Deck(); // Composition: a deck is integral to a game
    this.communityCards = [];
    this.pot = 0;
    this.currentDealer = null;
    this.gamePhase = 'pre-flop';

    // Update GameState with the current game instance and players
    const gameState = GameState.getInstance();
    gameState.currentGame = this;
    gameState.activePlayers = this.players;
    gameState.gamePhase = this.gamePhase;
  }

  /**
   * Deals two cards to each player.
   */
  dealCards() {
    this.players.forEach(player => {
      player.hand = [this.deck.drawCard(), this.deck.drawCard()];
    });
  }

  /**
   * Runs a betting round.
   */
  bettingRound() {
    console.log(`Starting ${this.gamePhase} betting round...`);
    const round = new BettingRound();
    // Simplified: iterate through players and have them place a bet
    this.players.forEach(player => {
      // Each player makes a decision; polymorphism in action:
      const decision = player.makeDecision({ phase: this.gamePhase });
      if (decision === 'bet' || decision === 'raise') {
        round.placeBet(player, 50);
        this.pot += 50;
      }
    });
    round.processActions();

    // update the active players in GameState.
    const gameState = GameState.getInstance();
    gameState.updateActivePlayers(this.players);
  }

  /**
   * Advances the game to the next phase.
   */
  nextPhase() {
    // Simplified: just update the phase string for demonstration
    if (this.gamePhase === 'pre-flop') this.gamePhase = 'flop';
    else if (this.gamePhase === 'flop') this.gamePhase = 'turn';
    else if (this.gamePhase === 'turn') this.gamePhase = 'river';
    else if (this.gamePhase === 'river') this.gamePhase = 'showdown';

    // Update the game phase in GameState.
    const gameState = GameState.getInstance();
    gameState.updatePhase(this.gamePhase);
  }

  /**
   * Determines the winner using the HandEvaluator.
   * @returns {object} The winning player.
   */
  determineWinner() {
    // const evaluator = new HandEvaluator();
    let bestScore = 0;
    let winner = null;
    this.players.forEach(player => {
      // Simplified: In a real scenario, implement hand ranking logic based on Texas Hold'em rules
      const score = (player.hand[0].rankValue + player.hand[1].rankValue) * 10 + player.hand[0].suitValue + player.hand[1].suitValue;
      if (score > bestScore) {
        bestScore = score;
        winner = player;
      }
    });
    return winner;
  }

  /**
   * Ends the game, updates player accounts, and saves game history.
   */
  endGame() {
    const winner = this.determineWinner();
    console.log(`The winner is ${winner.name}!`);
    console.log(`Hand: ${winner.hand[0]}, ${winner.hand[1]}`);
    console.log(`Win the pot of ${this.pot} chips.`);
    // For demonstration, assume winner gains the entire pot and others lose a fixed amount.
    this.players.forEach(player => {
      if (player === winner) {
        AccountManager.getInstance().updateChips(player.name, this.pot);
      } else {
        AccountManager.getInstance().updateChips(player.name, -25);
      }
    });
    // Save game result for human players (simplified example)
    this.players.forEach(player => {
      if (player.constructor.name === 'HumanPlayer') {
        AccountManager.getInstance().saveGameResult(
          player.name,
          this.gameID,
          new Date().toISOString(),
          this.players.length,
          player === winner ? this.pot : -25
        );
      }
    });
    const gameState = GameState.getInstance();
    gameState.resetGame();
  }

  /**
   * Overall game flow
   */
  playGame() {
    this.dealCards();
    const gameState = GameState.getInstance();
    while (!gameState.checkEndConditions()) {
      this.bettingRound();
      this.nextPhase();
    }
    this.endGame();
  }
}