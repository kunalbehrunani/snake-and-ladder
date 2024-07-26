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

  public setSnake(param: { position: number; snake: Snake }): void {
    if (param.position <= 0 || param.position > this._board.length) {
      throw new Error('Error: Invalid position on board to set snake');
    }
    const block = this._board[param.position];

    if (block.getLadder() || block.getSnake) {
      throw new Error('Error: Only 1 ladder or snake can exist in a block');
    }

    block.setSnake(param.snake);
    return;
  }

  public setLadder(param: { position: number; ladder: Ladder }): void {
    if (param.position <= 0 || param.position > this._board.length) {
      throw new Error('Error: Invalid position on board to set ladder');
    }
    const block = this._board[param.position];

    if (block.getLadder() || block.getSnake()) {
      throw new Error('Error: Only 1 ladder or snake can exist in a block');
    }

    block.setLadder(param.ladder);
    return;
  }

  public printBoard() {
    for (let i = 1; i < this._board.length; i += 1) {
      let identifier = '    ';
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
