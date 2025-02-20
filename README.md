# Texas Hold'em Poker Game(OOP)

## Overview
This project aims to develop a Texas Hold’em Poker Game App where players can compete against both human and computer opponents while managing their accounts and tracking their game history. The focus of this project is not just on game mechanics but primarily on demonstrating Object-Oriented Programming (OOP) pillars, principles, and design patterns in a structured and scalable manner.

---

## Features

- **Modular Design:** Organized using ES204 modules, separating game flow, player management, account management, and more.
- **OOP Principles:** Demonstrates Abstraction, Encapsulation, Inheritance, and Polymorphism.
- **SOLID Design:** Each module adheres to Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles.
- **Design Patterns:**
  - **Singleton:** Centralized management via `AccountManager` and `GameState`.
  - **Factory:** Centralized player creation using `PlayerFactory`.
  - **Strategy:** Flexible AI behavior with interchangeable betting strategies.
- **Game Flow Control:** A clear game loop managed by the `Game` class with a `playGame()` method.
- **Customizable AI:** Users can customize the number of AI players and modify their betting strategies.
- **Account and History Management:** Human players have persistent accounts that track chip balances and game history.
- **Leaderboard:** Aggregates and displays player rankings based on chip balance.

---

## UML Class Diagram

  - https://lucid.app/lucidchart/5bf96df1-7f5e-485d-a7d1-632b42da5473/edit?viewport_loc=-969%2C179%2C2195%2C2451%2CM2ESADCeBlsG&invitationId=inv_415e6e44-7613-4423-9ddb-cde1f67f05e9
    
---

## Interface low level mockups:
    
  - https://www.figma.com/design/BuQEdCCBBZMbSiKSoTJhWC/Poker-Game?node-id=0-1&t=V18WyP5xhCQdEvtO-1

---

## Architecture and Design

The project is built around a well-defined object-oriented architecture:

- **Core Game Modules:**
  - `GameRoom.js`: Handles pre-game setup and AI customization.
  - `Game.js`: Manages the overall game flow, including dealing cards, betting rounds, and determining winners.
  - `GameState.js`: A Singleton that tracks the current game session, active players, and game phase.
  
- **Player Management:**
  - `Player.js`: An abstract base class for all players.
  - `HumanPlayer.js` and `ComputerPlayer.js`: Extend `Player` to implement specific behavior.
  - `PlayerFactory.js`: A Factory pattern implementation for creating player instances.

- **AI Behavior:**
  - `BettingStrategy.js`: An abstract class defining a common interface for betting strategies.
  - Concrete implementations like `BalancedBetting.js`, `CautiousBetting.js`, and `AggressiveBetting.js` allow dynamic AI behavior.

- **Account and History Management:**
  - `PlayerAccount.js`: Encapsulates persistent account data for human players.
  - `AccountManager.js`: A Singleton that manages all player accounts.
  - `GameHistory.js`: Stores individual game results, including AI difficulty breakdown.
  - `Leaderboard.js`: Aggregates player accounts to display rankings.

- **Utilities and Helpers:**
  - `Deck.js` and `Card.js`: Manage card operations.
  - `HandEvaluator.js`: Evaluates player hands to determine winners.
  - `BettingRound.js`: Manages betting rounds within the game.

This architecture ensures high cohesion and low coupling, making the codebase maintainable and extendable.

---
## Run
To run the basic example please run

```bash
npm start
```
## Testing
To run the set of tests run

```bash
npm test
```

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Resources
  - JS: https://developer.mozilla.org/en-US/docs/Web/JavaScript
  - JSDoc: https://jsdoc.app/
  - **AI Usage:**
    - ChatGPT(4o/o3-mini-high)
      - Used for project overview and core functionality
        - Prompt: 
          For the project, I'd like to build a Texas Hold’em Poker Game where players can compete against both human and computer opponents. The game follows standard Texas Hold’em rules. Players can choose how many computer opponents to include, and the system simulates their actions. Additionally, the users have their account allowing them to save their chip balance and track their win/loss history across multiple sessions.  
          Features:  
          - The user can decide how many computer players to include before starting the game.  
          - Players have accounts where their chip balance and game history are saved.
          - Players can keep track of and view their win or loss amount history on each game.
          - Players take turns betting, checking, folding, or calling.  
          - The game reveals the flop, turn, and river cards according to Texas Hold’em rules.  
          - The system automatically evaluates hands and determines the winner at showdown. 
          Above is my project idea, create an overview and business requirements as bullet points.
      - Used for user dimensions
        - Prompt: What are some dimensions that classify the users
      - Used for personas and user stories
        - Prompt: Create 2 User personas and 3 user stories per persona
      - Used for JSDoc documentation
        - Prompt: (code) Help me document my code using JSDoc
        - Verified through researching on the JSDoc(link provided in resources)
      - Used for writing README.md(Features, Architecture and Design)
        - Prompt: Summarize some features, Architecture and Design for my project to write a README
      - Used for writing hypothetical example in OOP_Demonstration.md
        - Prompt: (code) Provide an hypothetical example that would break the concept
        - Verified through understanding the concepts


