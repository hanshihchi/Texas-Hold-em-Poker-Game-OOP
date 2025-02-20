# Texas Hold’em Poker Game – OOP, SOLID, and Design Patterns Demonstration

This document explains how our Texas Hold’em Poker Game project demonstrates core object‐oriented programming (OOP) pillars, SOLID principles, and design patterns using ES204 modules in JavaScript. The code examples below include JSDoc documentation and cover:

- **OOP Pillars:** Abstraction, Encapsulation, Inheritance, and Polymorphism.
- **SOLID Principles:** Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.
- **Design Patterns:** Singleton, Factory, and Strategy.

It also explains why these implementations are a good application of OOP and describes hypothetical scenarios that would break these concepts if not properly applied.

---

## Table of Contents

1. [OOP Pillars](#oop-pillars)
    - Abstraction
    - Encapsulation
    - Inheritance
    - Polymorphism
2. [SOLID Principles](#solid-principles)
    - Single Responsibility
    - Open/Closed
    - Liskov Substitution
    - Interface Segregation
    - Dependency Inversion
3. [Design Patterns](#design-patterns)
    - Singleton
    - Factory
    - Strategy

---

## OOP Pillars

### 1. Abstraction

**Example: Abstract `Player` Class**

```javascript
// src/Player.js
/**
 * @module Player
 */

/**
 * Abstract class representing a generic player.
 * @abstract
 */
export default class Player {
  /**
   * Creates a new player.
   * @param {string} name - The player's name.
   */
  constructor(name) {
    if (new.target === Player) {
      throw new Error("Cannot instantiate abstract class Player directly");
    }
    this.name = name;
    this.chips = 0;
    this.hand = [];
    this.folded = false;
  }

  /**
   * Abstract method to decide on an action.
   * @param {object} gameState - The current game state.
   * @returns {string} The action decided by the player.
   * @abstract
   */
  makeDecision(gameState) {
    throw new Error("makeDecision() must be implemented by subclasses");
  }
}
```
```javascript
// src/HumanPlayer.js
/**
 * @module HumanPlayer
 */
import Player from './Player.js';
import AccountManager from './AccountManager.js';

/**
 * Represents a human player.
 * @extends Player
 */
export default class HumanPlayer extends Player {
  /**
   * @param {string} name - The player's name.
   */
  constructor(name) {
    super(name);
    // Link the human player to their persistent account.
    this.account = AccountManager.getInstance().getPlayerAccount(name);
  }

  /**
   * Prompts the human player for an action (abstraction example).
   * @param {object} gameState - The current game state.
   * @returns {string} The chosen action.
   */
  makeDecision(gameState) {
    // For demonstration purposes, we'll just return a fixed value.
    return 'call';
  }
}

// src/ComputerPlayer.js
/**
 * @module ComputerPlayer
 */
import Player from './Player.js';

/**
 * Represents a computer-controlled player.
 * @extends Player
 */
export default class ComputerPlayer extends Player {
  /**
   * @param {string} name - The computer player's name.
   * @param {object} bettingStrategy - An instance of a BettingStrategy.
   */
  constructor(name, bettingStrategy) {
    super(name);
    this.bettingStrategy = bettingStrategy;
  }

  /**
   * Uses the betting strategy to make a decision (polymorphism example).
   * @param {object} gameState - The current game state.
   * @returns {string} The chosen action.
   */
  makeDecision(gameState) {
    return this.bettingStrategy.makeDecision(gameState);
  }
}
```
**Why It’s Good:**  
This abstract class hides the implementation details for decision making. The Player class provides a high-level interface (properties and the makeDecision method) without revealing how a player’s decision-making process works. 
**Hypothetical Break:** If all logic were exposed in a concrete class, changes in decision-making would require modifying multiple parts of the code.
```javascript
export default class Player {
  constructor(name) {
    this.name = name;
    this.chips = 0; // public property
    this.hand = [];
    this.folded = false;
  }
  
  // Decision logic is fully exposed here
  makeDecision(gameState) {
    // Complex logic directly implemented
    if (gameState.phase === 'pre-flop') return 'bet';
    return 'call';
  }
}
```

---

### 2. Encapsulation

**Example: `PlayerAccount` Class**

```javascript
// src/PlayerAccount.js
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
   * @param {number} [initialChips=1000] - The starting chip balance.
   */
  constructor(playerName, initialChips = 1000) {
    this.playerName = playerName;
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
   * Saves a game result as a GameHistory record.
   * @param {string} gameID
   * @param {string} dateTime
   * @param {string|Object} aiDifficulty - Either a string or an object mapping difficulties to counts.
   * @param {number} numPlayers
   * @param {number} finalWinLoss
   */
  saveGameResult(gameID, dateTime, aiDifficulty, numPlayers, finalWinLoss) {
    const record = new GameHistory(gameID, dateTime, aiDifficulty, numPlayers, finalWinLoss);
    this.history.push(record);
  }

  /**
   * Retrieves the game history.
   * @returns {GameHistory[]}
   */
  getHistory() {
    return this.history;
  }
}
```

**Why It’s Good:**  
Data is modified and retrieved only through methods, protecting internal state.  
**Hypothetical Break:** If properties like `chips` were public and modifiable directly, it could lead to inconsistent state.
```javascript
export default class PlayerAccount {
  constructor(playerName, initialChips = 1000) {
    this.playerName = playerName;
    this.chips = initialChips; // Public property
    this.history = [];
  }
}

const account = new PlayerAccount("Alice", 1000);
account.chips += -1000; // Direct modification, which breaks consistency
```
---

### 3. Inheritance

**Example: `HumanPlayer` and `ComputerPlayer` Extending `Player`**

```javascript
// src/HumanPlayer.js
/**
 * @module HumanPlayer
 */
import Player from './Player.js';
import AccountManager from './AccountManager.js';

/**
 * Represents a human-controlled player.
 * @extends Player
 */
export default class HumanPlayer extends Player {
  /**
   * @param {string} name - The player's name.
   */
  constructor(name) {
    super(name);
    // Aggregation: HumanPlayer retrieves its PlayerAccount from AccountManager.
    this.account = AccountManager.getInstance().getPlayerAccount(name);
  }

  /**
   * Prompts the user for an action.
   * @param {object} gameState
   * @returns {string} The chosen action.
   */
  makeDecision(gameState) {
    return 'call'; // For demonstration, a fixed value is returned.
  }
}
```

```javascript
// src/ComputerPlayer.js
/**
 * @module ComputerPlayer
 */
import Player from './Player.js';

/**
 * Represents a computer-controlled player.
 * @extends Player
 */
export default class ComputerPlayer extends Player {
  /**
   * @param {string} name - The player's name.
   * @param {object} bettingStrategy - An instance of a BettingStrategy.
   */
  constructor(name, bettingStrategy) {
    super(name);
    this.bettingStrategy = bettingStrategy;
  }

  /**
   * Uses the betting strategy to decide an action.
   * @param {object} gameState
   * @returns {string} The chosen action.
   */
  makeDecision(gameState) {
    return this.bettingStrategy.makeDecision(gameState);
  }
}
```

**Why It’s Good:**  
Inheritance allows us to reuse common properties and methods from `Player` and specialize behavior in `HumanPlayer` and `ComputerPlayer`.  
**Hypothetical Break:** Without inheritance, common code would need to be duplicated across different player types, increasing maintenance.
```javascript
export default class HumanPlayer {
  constructor(name) {
    this.name = name;
    this.chips = 0;
    // duplicate hand, folded properties...
  }
  makeDecision(gameState) {
    // logic...
  }
}

export default class ComputerPlayer {
  constructor(name, bettingStrategy) {
    this.name = name;
    this.chips = 0;
    // duplicate hand, folded properties...
    this.bettingStrategy = bettingStrategy;
  }
  makeDecision(gameState) {
    // similar logic but repeated.
  }
}
```

---

### 4. Polymorphism

**Example: Different Betting Strategies via the `BettingStrategy` Abstract Class**

```javascript
// src/BettingStrategy.js
/**
 * @module BettingStrategy
 */

/**
 * Abstract class for betting strategies.
 * @abstract
 */
export default class BettingStrategy {
  /**
   * Makes a betting decision.
   * @param {object} gameState - The current game state.
   * @returns {string} The betting decision.
   * @abstract
   */
  makeDecision(gameState) {
    throw new Error('makeDecision() must be implemented');
  }
}
```

```javascript
// src/BalancedBetting.js
/**
 * @module BalancedBetting
 */
import BettingStrategy from './BettingStrategy.js';

/**
 * Implements a balanced betting strategy.
 * @extends BettingStrategy
 */
export default class BalancedBetting extends BettingStrategy {
  constructor() {
    super();
    this.difficulty = 'Medium';
  }
  makeDecision(gameState) {
    return 'call';
  }
}
```

**Why It’s Good:**  
`ComputerPlayer` uses any instance of a subclass of `BettingStrategy` to decide its action, allowing dynamic behavior changes at runtime.  
**Hypothetical Break:** If betting logic were hard-coded into `ComputerPlayer`, the system would lose flexibility.
```javascript
export class ComputerPlayer {
  constructor(name) {
    this.name = name;
    this.chips = 0;
  }
  
  // Hard-coded decision logic; cannot change dynamically.
  makeDecision(gameState) {
    return 'call';
  }
}
```

---

## SOLID Principles

### 1. Single Responsibility Principle (SRP)

**Example: `Deck` Class**

```javascript
// src/Deck.js
import Card from './Card.js';

/**
 * Represents a deck of playing cards.
 */
export default class Deck {
  constructor() {
    this.cards = [];
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    for (const suit of suits) {
      for (const rank of ranks) {
        this.cards.push(new Card(suit, rank));
      }
    }
    this.shuffle();
  }
  shuffle() {
    this.cards.sort(() => Math.random() - 0.5);
  }
  drawCard() {
    return this.cards.pop();
  }
}
```

**Why It’s Good:**  
`Deck` is responsible solely for managing cards.  
**Hypothetical Break:** Combining deck management with game logic would violate SRP by mixing distinct responsibilities.A single class that manages cards, game logic and elements.
```javascript
export class GameManager {
  constructor() {
    this.gameID = Math.floor(Math.random() * 1000); // game ID
    this.players = players;
    this.cards = []; // card management
    this.communityCards = [];
    this.pot = 0;
    this.currentDealer = null;
    this.gamePhase = 'pre-flop';
  }
  // Methods for card management, game logic, and players control all mixed together.
}
```

---

### 2. Open/Closed Principle (OCP)

**Example: Adding a New Betting Strategy**

```javascript
// src/UltraAggressiveBetting.js
import BettingStrategy from './BettingStrategy.js';

/**
 * Represents an ultra-aggressive betting strategy.
 * @extends BettingStrategy
 */
export default class UltraAggressiveBetting extends BettingStrategy {
  constructor() {
    super();
    this.difficulty = 'Ultra Hard';
  }
  makeDecision(gameState) {
    return 'all-in';
  }
}
```

**Why It’s Good:**  
We can add new strategies without modifying existing classes like `ComputerPlayer`.  
**Hypothetical Break:** Hard-coding new strategies into `ComputerPlayer` would require modifying the class each time, violating OCP.
```javascript
export class ComputerPlayer extends Player {
  constructor(name) {
    super(name);
  }
  makeDecision(gameState) {
    // To add a new behavior, we would have to modify this method directly.
    if (gameState.phase === 'pre-flop') return 'raise';
    else if (gameState.phase === 'flop') return 'all-in'; // new behavior hard-coded.
    return 'call';
  }
}
```

---

### 3. Liskov Substitution Principle (LSP)

**Example: Using Subclasses Interchangeably**

```javascript
// Example usage in game logic:
const players = [
  new HumanPlayer('Alice'),
  new ComputerPlayer('Bot1', new BalancedBetting())
];
players.forEach(player => {
  console.log(player.makeDecision({ phase: 'pre-flop' }));
});
```

**Why It’s Good:**  
Both `HumanPlayer` and `ComputerPlayer` behave as expected when used as `Player`.  
**Hypothetical Break:** A subclass that doesn't conform to `Player`'s expected behavior would break substitution and lead to errors.
```javascript
export class FaultyPlayer extends Player {
  constructor(name) {
    super(name);
  }
  makeDecision(gameState) {
    // Instead of returning a valid action, it always throws an error.
    throw new Error('Faulty decision logic');
  }
}
// Using FaultyPlayer in place of Player would break game flow.
```

---

### 4. Interface Segregation Principle (ISP)

**Example:**  
Abstract classes like `Player` and `BettingStrategy` define only the necessary methods. This ensures that subclasses implement only what they need.
```javascript
// src/Player.js 
export default class Player {
    /**
     * @param {string} name - The player's name.
     */
    constructor(name) {
      if (new.target === Player) {
        throw new TypeError('Cannot construct Player instances directly');
      }
      this.name = name;
      this.chips = 0;
      this.hand = [];
      this.folded = false;
    }
  
    /**
     * Deducts chips for a bet.
     * @param {number} amount - The bet amount.
     */
    placeBet(amount) {
      this.chips -= amount;
    }

    fold() {
        this.folded = true;
    }
  
    /**
     * Abstract method for making a decision.
     * @abstract
     * @param {object} gameState - The current game state.
     * @returns {string} The chosen action.
     */
    makeDecision(gameState) {
      throw new Error('makeDecision() must be implemented by subclasses');
    }
  }
```

**Why It’s Good:**  
Clients rely on minimal, specific interfaces.  
**Hypothetical Break:** Forcing a class to implement methods it doesn't require would create unnecessary dependencies.
```javascript
export default class Player {
    /**
     * Abstract method for making a decision.
     * @abstract
     * @param {object} gameState - The current game state.
     * @returns {string} The chosen action.
     */
    makeDecision(gameState) {
      throw new Error('makeDecision() must be implemented by subclasses');
    }
  
    /**
     * Abstract method for chatting with other players (e.g., in an online game).
     * @abstract
     * @param {string} message - The chat message.
     */
    sendChatMessage(message) {
      throw new Error('sendChatMessage() must be implemented by subclasses');
    }
}

export default class ComputerPlayer extends Player {
  /**
   * @param {string} name - The computer player's name.
   * @param {object} bettingStrategy - An instance of a BettingStrategy.
   */
  constructor(name, bettingStrategy) {
    super(name);
    this.bettingStrategy = bettingStrategy;
  }

  /**
   * Uses the betting strategy to make a decision (polymorphism example).
   * @param {object} gameState - The current game state.
   * @returns {string} The chosen action.
   */
  makeDecision(gameState) {
    return this.bettingStrategy.makeDecision(gameState);
  }

  // Forced to implement irrelevant methods
  sendChatMessage(message) {
    // AI doesn't chat, but must implement it
    return;
  }
}
```

---

### 5. Dependency Inversion Principle (DIP)

**Example: `ComputerPlayer` Depending on the Abstract `BettingStrategy`**

```javascript
// src/ComputerPlayer.js
import Player from './Player.js';
export default class ComputerPlayer extends Player {
  constructor(name, bettingStrategy) {
    super(name);
    // Depends on the abstraction BettingStrategy rather than a concrete class.
    this.bettingStrategy = bettingStrategy;
  }
  makeDecision(gameState) {
    return this.bettingStrategy.makeDecision(gameState);
  }
}
```

**Why It’s Good:**  
High-level modules depend on abstractions, making the system more flexible and decoupled.  
**Hypothetical Break:** Direct instantiation of a concrete strategy in `ComputerPlayer` would tightly couple the class, making it hard to extend.
```javascript
export class BadComputerPlayer extends Player {
  constructor(name) {
    super(name);
    // Direct instantiation couples the class to a concrete strategy.
    this.bettingStrategy = new AggressiveBetting();
  }
  makeDecision(gameState) {
    return this.bettingStrategy.makeDecision(gameState);
  }
}
```

---

## Design Patterns

### 1. Singleton Pattern

**Example: `AccountManager`**

```javascript
// src/AccountManager.js
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
    this.accounts = {};
    AccountManager.instance = this;
  }

  /**
   * Gets the singleton instance of AccountManager.
   * @returns {AccountManager}
   */
  static getInstance() {
    if (!AccountManager.instance) {
      AccountManager.instance = new AccountManager();
    }
    return AccountManager.instance;
  }

  createAccount(playerName, initialChips = 1000) {
    if (!this.accounts[playerName]) {
      this.accounts[playerName] = new PlayerAccount(playerName, initialChips);
    }
  }

  getPlayerAccount(playerName) {
    return this.accounts[playerName] || null;
  }

  getChipBalance(playerName) {
    return this.accounts[playerName] ? this.accounts[playerName].chips : 0;
  }

  updateChips(playerName, amount) {
    const account = this.getPlayerAccount(playerName);
    if (account) {
      amount > 0 ? account.addChips(amount) : account.deductChips(Math.abs(amount));
    }
  }

  saveGameResult(playerName, gameID, dateTime, aiDifficulty, numPlayers, finalWinLoss) {
    const account = this.getPlayerAccount(playerName);
    if (account) {
      account.saveGameResult(gameID, dateTime, aiDifficulty, numPlayers, finalWinLoss);
    }
  }
}
```

**Why It’s Good:**  
Singleton ensures a single instance manages all accounts, preventing data inconsistency.  
**Hypothetical Break:** Multiple instances would lead to fragmented account data.
```javascript
export class BadAccountManager {
  constructor() {
    this.accounts = {};
  }
  // No singleton mechanism; multiple instances can be created.
}
const mgr1 = new BadAccountManager();
const mgr2 = new BadAccountManager();
mgr1.accounts['Alice'] = { chips: 1000 };
mgr2.accounts['Alice'] = { chips: 500 };
```

---

### 2. Factory Pattern

**Example: `PlayerFactory`**

```javascript
// src/PlayerFactory.js
import HumanPlayer from './HumanPlayer.js';
import ComputerPlayer from './ComputerPlayer.js';
import BalancedBetting from './BalancedBetting.js';

/**
 * Factory for creating player instances.
 */
export default class PlayerFactory {
  /**
   * Creates a new player.
   * @param {string} type - "human" or "computer".
   * @param {string} name - The player's name.
   * @param {object} [strategy] - Optional betting strategy for computer players.
   * @returns {Player}
   */
  static createPlayer(type, name, strategy) {
    if (type === 'human') {
      return new HumanPlayer(name);
    } else if (type === 'computer') {
      return new ComputerPlayer(name, strategy || new BalancedBetting());
    }
    throw new Error('Unknown player type');
  }
}
```

**Why It’s Good:**  
Centralizes object creation logic, making the code easier to maintain and extend.  
**Hypothetical Break:** Scattered instantiation logic would lead to duplicated code and errors.
```javascript
const player1 = new HumanPlayer('Alice');
const player2 = new ComputerPlayer('Bot1', new BalancedBetting());
// Later in another module:
const player3 = new HumanPlayer('Bob');
// If the creation logic changes, you must update every instantiation.
```

---

### 3. Strategy Pattern

**Example: `BettingStrategy` and `BalancedBetting`**

```javascript
// src/BettingStrategy.js
/**
 * Abstract class for betting strategies.
 * @abstract
 */
export default class BettingStrategy {
  /**
   * Makes a betting decision.
   * @param {object} gameState - The current game state.
   * @returns {string} The betting decision.
   * @abstract
   */
  makeDecision(gameState) {
    throw new Error('makeDecision() must be implemented');
  }
}
```

```javascript
// src/BalancedBetting.js
import BettingStrategy from './BettingStrategy.js';

/**
 * Implements a balanced betting strategy.
 * @extends BettingStrategy
 */
export default class BalancedBetting extends BettingStrategy {
  constructor() {
    super();
    this.difficulty = 'Medium';
  }
  makeDecision(gameState) {
    return 'call';
  }
}
```

**Why It’s Good:**  
Allows computer players to switch strategies at runtime without changing their implementation.  
**Hypothetical Break:** Hard-coding betting logic in `ComputerPlayer` would eliminate flexibility.
```javascript
export class ComputerPlayer extends Player {
  constructor(name) {
    super(name);
  }
  makeDecision(gameState) {
    // No strategy pattern used; decision is hard-coded.
    return 'call';
  }
}
```

*End of Document*
