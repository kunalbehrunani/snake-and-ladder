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

  /**
   * @description Start the snake and ladder gameplay
   */
  public startGame() {
    this.clearLogFile();

    const { boardLength, snakes, ladders, players } = this.fetchInput();
    console.log(boardLength);
    console.log(snakes, ladders, players);

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

    /**
     * @default all players are set to position 0 and not marked on the board
     */

    let gameplay: boolean = true;
    let totalTurns = 0;
    this.boardRepository.logBoard({ totalTurns });

    while (gameplay) {
      totalTurns += 1;
      this.log(`Turn #${totalTurns}`);

      const currPlayer = this.playerRepository.getNextPlayer();
      const oldPosition = currPlayer.position;
      let diceValue = this.rollDice();

      this.log(
        `____Player: ${currPlayer.userName}\n____Old Position: ${oldPosition}\n____Dice Value: ${diceValue}`,
      );

      /**
       * @description A player needs to get a diceValue of 6 & above in order to enter the gameplay
       */
      if (oldPosition === 0 && diceValue < 6) {
        this.log(`____[Player yet to enter gameplay]`);
        this.log(`____Final Position: ${0}`);
        this.boardRepository.logBoard({ totalTurns });
        continue;
      } else if (oldPosition === 0 && diceValue >= 6) {
        this.log(`____[Player enters gameplay]`);
        this.log(`____[Dice Value Updated]`);
        diceValue -= 6;
        this.log(`____Dice Value: ${diceValue}`);
      }

      if (diceValue === 0) {
        this.log(`____[Turn Omitted]`);
        this.log(`____Final Position: ${oldPosition}`);
        this.boardRepository.logBoard({ totalTurns });
        continue;
      }

      let newPosition = oldPosition + diceValue;
      this.log(`____New Position: ${newPosition}`);

      /**
       * @description If new position exceeds the board length, omit the move & move to next player
       */
      if (newPosition > this.boardRepository.boardLength) {
        this.log(`____[New Position Exceeds Board Length]`);
        this.log(`____Final Position: ${newPosition}`);
        this.boardRepository.logBoard({ totalTurns });
        continue;
      }

      let newPositionBlock = this.boardRepository.getBlock({
        position: newPosition,
      });

      if (newPositionBlock.getSnake()) {
        this.log(`____[Snake Found]`);
        newPosition = newPositionBlock.getSnake().tail;
        this.log(`____New Position: ${newPosition}`);
      }

      newPositionBlock = this.boardRepository.getBlock({
        position: newPosition,
      });

      if (newPositionBlock.getLadder()) {
        this.log(`____[Ladder Found]`);
        newPosition = newPositionBlock.getLadder().top;
        this.log(`____New Position: ${newPosition}`);
      }

      newPositionBlock = this.boardRepository.getBlock({
        position: newPosition,
      });

      if (newPositionBlock.getPlayer()) {
        this.log(`____[Player Found]`);
        const overruledPlayer = newPositionBlock.getPlayer();
        this.log(
          `____[${overruledPlayer.firstName} ${overruledPlayer.lastName} (${overruledPlayer.userName}) Overruled]`,
        );
        this.boardRepository.setPlayer({ position: newPosition, player: null });
        overruledPlayer.position = 0;
      }

      this.log(`____Final Position: ${newPosition}`);
      currPlayer.position = newPosition;

      this.boardRepository.setPlayer({ position: oldPosition, player: null });
      this.boardRepository.setPlayer({
        position: newPosition,
        player: currPlayer,
      });
      this.boardRepository.logBoard({ totalTurns });

      if (newPosition === this.boardRepository.boardLength) {
        this.log(`\n*****************************************************`);
        this.log(
          ` 🏆🏆 WINNER - ${currPlayer.firstName} ${currPlayer.lastName} (${currPlayer.userName}) 🏆🏆`,
        );
        this.log(`*****************************************************\n\n`);
        gameplay = false;
      }
    }
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
    let diceValue = Math.floor(Math.random() * 7) || 1;
    totalAttempts -= 1;

    while (totalAttempts > 0 && diceValue % 6 === 0) {
      diceValue += Math.floor(Math.random() * 7) || 1;
      totalAttempts -= 1;
    }

    if (totalAttempts === 0) {
      diceValue = 0;
    }

    return diceValue;
  }

  /**
   *
   * @description Append game play logs to log/gameplay.log file
   */
  private log(message: string): void {
    console.log(message);
    fs.appendFileSync('log/gameplay.log', `${message}\n`);
  }

  /**
   * @description clear the existing logs before starting a new game or create log directory if not exists.
   */
  private clearLogFile() {
    try {
      fs.writeFileSync('log/gameplay.log', '');
      fs.writeFileSync('log/board.log', '');
    } catch (err) {
      if (fs.existsSync('log/gameplay.log') === false) {
        fs.mkdirSync('log');
      }
    }
  }
}
