/**
 * @module index
 */
import { AccountManager } from './src/AccountManager.js';
import { PlayerFactory } from './src/PlayerFactory.js';
import { GameRoom } from './src/GameRoom.js';
import { Leaderboard } from './src/Leaderboard.js';

// Create account for a User
const accountManager = AccountManager.getInstance();
accountManager.createAccount('Mark', 'mark@email.com', 'password', '1990-01-01');

// Create human player using the factory
const humanPlayer = PlayerFactory.createPlayer('human', 'Mark');

// Setup game room with 2 AI players and default difficulty "Medium"
const gameRoom = new GameRoom();
gameRoom.setAIPlayers(2);

// Optionally, modify one AI's strategy before starting the game
gameRoom.modifyAIStrategy(0, 'Hard');

// Start the game
const game = gameRoom.startGame(humanPlayer);

// Simulate game flow
game.playGame();

// Log game history for human player
console.log(accountManager.getPlayerAccount('Mark').getHistory().map(record => record.toString()));

// Create a Leaderboard instance, which internally fetches accounts
const leaderboard = new Leaderboard();

// Display the leaderboard (returns a formatted string)
console.log(leaderboard.displayLeaderboard());