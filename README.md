# Snake And Ladder Game Application (Backend)

## Overview

A Node.js backend web application built with Typescript & NestJS that allows multiple users to play snake and ladder game.

## Getting Started
### Prerequsite
1. Node.js (v18.x or higher) run time environment
2. NVM (v0.39.x or higher) 
### Installation
1. Clone the repository.
```
git clone https://github.com/kunalbehrunani/snake-and-ladder.git
```
2. Install dependencies.
```
cd snake-and-ladder
nvm use v18
npm install
```
### Run the application
1. Customise Snake & Ladder Board using `input/input.jsonc` file (JSON with comments).
2. Ensure all parameters are adhering to data sanity checks as mentioned in the comments in `input/input.jsonc` file.
3. Run the following command:
```
npm run start
```
### Output
1. Refer to the `console (terminal)` for the result i.e. winner of the gameplay.
2. Refer to `log/gameplay.log` & `log/board.log` for detailed overview of the gameplay (turn-wise).
## Game Rules
Following game rules are implemented:
1. All players require to get a six on the dice in order to enter the gameplay.
2. A player can overrule (terminate another player) from the gameplay if the player hops on to the same position.
3. In case a player gets overruled, the player will need to start again following rule #1 in order to re-enter the gameplay.
4. A player will fall down to the tail of the snake if the player hops to the position of the head of the snake.
5. A player will climp up to the top of the ladder if the player hops to the position of the bottom of the ladder.
6. A player will get to roll the dice again if the player encounters a six on the dice.
7. A player will get maximum 3 attempts to roll the dice if they keep encountering a six. After 3 attempts the player's turn will be omitted.
8. The game ends as soon as any one player reaches the end of the board.
## Contribute
Follow the below steps to contribute:
1. Fork the repository.
2. Create a new branch for your feature/bug-fix.
3. Commit your changes.
4. Push to your branch.
5. Create a Pull Request
## Stay in touch
- Author - [Kunal Behrunani](https://linkedin.com/in/kunalbehrunani)
