/**
 * @jest-environment node
 */

import { AccountManager } from '../src/AccountManager.js';
import { PlayerFactory } from '../src/PlayerFactory.js';
import { GameRoom } from '../src/GameRoom.js';
import { Game } from '../src/Game.js';
import { Leaderboard } from '../src/Leaderboard.js';
import { GameState } from '../src/GameState.js';

describe('AccountManager Tests', () => {
  test('should create and update an account', () => {
    const accountManager = AccountManager.getInstance();
    accountManager.createAccount('Alice');
    expect(accountManager.getPlayerAccount('Alice').getChipBalance()).toBe(10000);
    accountManager.updateChips('Alice', 200);
    expect(accountManager.getPlayerAccount('Alice').getChipBalance()).toBe(10200);
    accountManager.updateChips('Alice', -300);
    expect(accountManager.getPlayerAccount('Alice').getChipBalance()).toBe(9900);
  });
});

describe('GameRoom Tests', () => {
  test('should set AI players with default difficulty and update strategies', () => {
    const gameRoom = new GameRoom();
    // Set overall difficulty to 'Easy' (maps to CautiousBetting)
    gameRoom.setGameDifficulty('Easy');
    gameRoom.setAIPlayers(3);
    expect(gameRoom.aiPlayers.length).toBe(3);
    // Assume CautiousBetting returns "check" as its decision
    const decision = gameRoom.aiPlayers[0].makeDecision({ phase: 'pre-flop' });
    expect(decision).toBe('check');
    // Modify first AI to use Hard difficulty (maps to AggressiveBetting, returning "raise")
    gameRoom.modifyAIStrategy(0, 'Hard');
    const newDecision = gameRoom.aiPlayers[0].makeDecision({ phase: 'pre-flop' });
    expect(newDecision).toBe('raise');
  });
});

describe('Game Flow Tests', () => {
  test('should progress through phases and update GameState active players', () => {
    const accountManager = AccountManager.getInstance();
    accountManager.createAccount('Bob', 1000);
    const humanPlayer = PlayerFactory.createPlayer('human', 'Bob');
    const gameRoom = new GameRoom();
    gameRoom.setAIPlayers(2);
    // Start the game with one human and two AI players.
    const game = gameRoom.startGame(humanPlayer);
    
    // Verify initial game phase
    expect(game.gamePhase).toBe('pre-flop');
    
    // Simulate one betting round and then phase change
    game.bettingRound();
    game.nextPhase();
    expect(game.gamePhase).toBe('flop');

    // Verify that GameState tracks active players
    const gameState = GameState.getInstance();
    gameState.updateActivePlayers(game.players);
    const activeCount = game.players.filter(p => !p.folded).length;
    expect(gameState.activePlayers.length).toBe(activeCount);

    // Simulate one AI folding
    game.players[1].fold(); // Assume index 1 is an AI
    gameState.updateActivePlayers(game.players);
    expect(gameState.activePlayers.length).toBe(game.players.filter(p => !p.folded).length);
  });

  test('should end game when game phase is showdown or one active player remains', () => {
    const accountManager = AccountManager.getInstance();
    accountManager.createAccount('Bob', 1000);
    const humanPlayer = PlayerFactory.createPlayer('human', 'Bob');
    const gameRoom = new GameRoom();
    gameRoom.setAIPlayers(2);
    const game = gameRoom.startGame(humanPlayer);
    
    // Force game phase to showdown
    game.gamePhase = 'showdown';
    const gameState = GameState.getInstance();
    gameState.updatePhase('showdown');
    expect(gameState.checkEndConditions()).toBe(true);
    
    // Alternatively, if only one active player remains
    game.players[1].fold();
    game.players[2].fold();
    gameState.updateActivePlayers(game.players);
    expect(gameState.activePlayers.length).toBe(1);
    expect(gameState.checkEndConditions()).toBe(true);
  });
});

describe('Leaderboard Tests', () => {
  test('should display leaderboard correctly', () => {
    const accountManager = AccountManager.getInstance();
    accountManager.createAccount('Charlie', 1500);
    accountManager.createAccount('Dave', 1200);
    
    const leaderboard = new Leaderboard();
    const rankings = leaderboard.getRankings();
    // Expect rankings array to be sorted in descending order by chips.
    expect(rankings[0].chips).toBeGreaterThanOrEqual(rankings[1].chips);
    
    const display = leaderboard.displayLeaderboard();
    expect(typeof display).toBe('string');
    expect(display).toContain('Charlie');
    expect(display).toContain('Dave');
  });
});

describe('Game playGame() Method Tests', () => {
  test('should run complete game flow using playGame()', () => {
    const accountManager = AccountManager.getInstance();
    accountManager.createAccount('Eve', 1000);
    const humanPlayer = PlayerFactory.createPlayer('human', 'Eve');
    const gameRoom = new GameRoom();
    gameRoom.setAIPlayers(2);
    const game = gameRoom.startGame(humanPlayer);

    // For testing, override nextPhase to quickly reach showdown:
    game.nextPhase(); // pre-flop -> flop
    game.nextPhase(); // flop -> turn
    game.nextPhase(); // turn -> river
    game.nextPhase(); // river -> showdown
    
    // At this point, playGame() would end immediately because checkEndConditions() returns true
    game.playGame();

    // Verify that game ended and accounts have been updated (balance is a number)
    const eveBalance = accountManager.getPlayerAccount('Eve').getChipBalance();
    expect(typeof eveBalance).toBe('number');
  });
});
