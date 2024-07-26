import { Injectable } from '@nestjs/common';
import { Block } from '../schemas/block.schema';
import { Ladder } from '../schemas/ladder.schema';
import { Snake } from '../schemas/snake.schema';

@Injectable()
export class BoardRepository {
  private _board: Block[] = [new Block(0)];

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

  public printBoard() {
    for (let i = 1; i < this._board.length; i += 1) {
      let identifier = '        ';
      if (this._board[i].getLadder()) {
        identifier = `L_${this._board[i].getLadder().bottom}_${this._board[i].getLadder().top}`;
      } else if (this._board[i].getSnake()) {
        identifier = `S_${this._board[i].getSnake().head}_${this._board[i].getSnake().tail}`;
      } else if (this._board[i].getPlayer()) {
        identifier = `P_${this._board[i].getPlayer().userName}`;
      }

      console.log(`| ${i} ${identifier} |`);

      if (i % Math.sqrt(this._board.length - 1) === 0) {
        console.log();
      }
    }
  }
}
