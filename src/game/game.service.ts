import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { BoardRepository } from './repositories/board.repository';
import * as jsoncParser from 'jsonc-parser';

import { Snake } from './schemas/snake.schema';
import { SnakeRepository } from './repositories/snake.repository';
import { Ladder } from './schemas/ladder.schema';
import { LadderRepository } from './repositories/ladder.repository';
import { Player } from './schemas/player.schema';
import { PlayerRepository } from './repositories/player.repository';

@Injectable()
export class GameService {
  constructor(
    private readonly snakeRepository: SnakeRepository,
    private readonly ladderRepository: LadderRepository,
    private readonly playerRepository: PlayerRepository,
    private readonly boardRepository: BoardRepository,
  ) {}

  public startGame() {
    const { boardLength, snakes, ladders, players } = this.fetchInput();
    console.log(boardLength);
    console.log(snakes, ladders, players);

    /**
     * Initialise Empty Board
     */
    this.boardRepository.initialiseEmptyBoard({ boardLength });

    /**
     * Set all snakes on the board
     */
    for (let i = 0; i < snakes.length; i += 1) {
      this.boardRepository.setSnake({ snake: snakes[i] });
    }

    /**
     * Set all ladders on the board
     */
    for (let i = 0; i < ladders.length; i += 1) {
      this.boardRepository.setLadder({ ladder: ladders[i] });
    }

    this.boardRepository.printBoard();
  }

  /**
   * @description Fetch user input to initialise various entities required for snake & ladder game.
   * @todo Add validation to ensure all positions in snakes & ladders are positive numbers ranging between [1, boardLength]
   * @todo Add validation to ensure no 2 ladders have the same bottom position
   * @todo Add validation to ensure no 2 snakes have the same head position
   * @todo Add validation to ensure no position has both - a snake head & ladder bottom or vice versa
   */
  private fetchInput(): {
    boardLength: number;
    snakes: Snake[];
    ladders: Ladder[];
    players: Player[];
  } {
    const input = fs.readFileSync('input/input.jsonc', 'utf-8').toString();
    const parsedInput = jsoncParser.parse(input);

    /**
     * @description Initialise new snakes using input
     */
    const boardLength = parsedInput.boardLength;

    /**
     * @description Initialise new snakes using input
     */
    const snakes: Snake[] = [];
    for (let i = 0; i < parsedInput.snakes.length; i += 1) {
      const currSnake: Snake = parsedInput.snakes[i];
      snakes.push(
        this.snakeRepository.createNewSnake({
          head: currSnake.head,
          tail: currSnake.tail,
          name: `S${i + 1}`,
        }),
      );
    }

    /**
     * @description Initialise new ladders using input
     */
    const ladders: Ladder[] = [];
    for (let i = 0; i < parsedInput.ladders.length; i += 1) {
      const currLadder: Ladder = parsedInput.ladders[i];
      ladders.push(
        this.ladderRepository.createNewLadder({
          bottom: currLadder.bottom,
          top: currLadder.top,
          name: `L${i + 1}`,
        }),
      );
    }

    /**
     * @description Initialise new players using input
     */
    const players: Player[] = [];
    for (let i = 0; i < parsedInput.players.length; i += 1) {
      const currPlayer: Player = parsedInput.players[i];
      players.push(
        this.playerRepository.createNewPlayer({
          firstName: currPlayer.firstName,
          lastName: currPlayer.lastName,
          userName: `P${i + 1}`,
        }),
      );
    }

    return {
      boardLength,
      snakes,
      ladders,
      players,
    };
  }

  private rollDice(): number {
    /**
     * @default if Math.random() is 0, then make it 1
     */
    let totalAttempts = 3;
    let diceValue = Math.floor(Math.random() * 6) || 1;
    totalAttempts -= 1;

    while (totalAttempts > 0 && diceValue % 6 === 0) {
      diceValue += Math.floor(Math.random() * 6) || 1;
      totalAttempts -= 1;
    }

    if (totalAttempts === 0) {
      diceValue = 0;
    }

    return diceValue;
  }
}
