import { Injectable } from '@nestjs/common';
import { Block } from '../schemas/block.schema';
import { Ladder } from '../schemas/ladder.schema';
import { Player } from '../schemas/player.schema';
import { Snake } from '../schemas/snake.schema';

@Injectable()
export class BoardRepository {
  private _board: Block[] = [new Block(0)];

  public get boardLength() {
    return this._board.length - 1;
  }

  /**
   * @description Initialise empty board of size boardlength
   */
  public initialiseEmptyBoard(param: { boardLength: number }): void {
    for (let i = 0; i < param.boardLength; i += 1) {
      this._board.push(new Block(i));
    }
  }

  /**
   * @description snake will always be set at its head position on the board.
   *
   */
  public setSnake(param: { snake: Snake }): void {
    const headPosition = param.snake.head;

    if (headPosition > this._board.length) {
      throw new Error('Error: Snake position exceeds board length');
    }

    const block: Block = this._board[headPosition];

    if (block.getLadder() || block.getSnake()) {
      throw new Error(
        'Error: Only 1 ladder or snake can exist at a block in the board',
      );
    }

    block.setSnake(param.snake);
    return;
  }

  /**
   * @description ladder will always be set at its bottom position on the board.
   */
  public setLadder(param: { ladder: Ladder }): void {
    const bottomPosition = param.ladder.bottom;

    if (bottomPosition > this._board.length) {
      throw new Error('Error: Ladder position exceeds board length');
    }

    const block: Block = this._board[bottomPosition];

    if (block.getLadder() || block.getSnake()) {
      throw new Error('Error: Only 1 ladder or snake can exist in a block');
    }

    block.setLadder(param.ladder);
    return;
  }

  public getBlock(param: { position: number }): Block {
    if (param.position > this.boardLength) {
      throw new Error('Error: position exceeds board length.');
    }
    return this._board[param.position];
  }

  public setPlayer(param: { position: number; player: Player | null }): void {
    this._board[param.position].setPlayer(param.player);
  }

  public printBoard() {
    console.log('***** BOARD *****');
    for (let i = 1; i <= this.boardLength; i += 1) {
      let identifier: string = null;
      if (this._board[i].getLadder()) {
        identifier = `LADDER ${this._board[i].getLadder().bottom} -> ${this._board[i].getLadder().top}`;
      } else if (this._board[i].getSnake()) {
        identifier = `SNAKE ${this._board[i].getSnake().head} -> ${this._board[i].getSnake().tail}`;
      } else if (this._board[i].getPlayer()) {
        identifier = `PLAYER ${this._board[i].getPlayer().firstName} ${this._board[i].getPlayer().lastName} (${this._board[i].getPlayer().userName})`;
      }

      if (identifier) {
        let position = '0000' + i.toString();
        position = position.slice(position.length - 3);
        console.log(`| #${position} ${identifier}`);
      }
    }
    console.log('***** BOARD *****');
  }
}
