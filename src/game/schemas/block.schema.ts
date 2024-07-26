import { Ladder } from './ladder.schema';
import { Player } from './player.schema';
import { Snake } from './snake.schema';

export class Block {
  private _position: number;
  private _player: Player;
  private _snake: Snake;
  private _ladder: Ladder;

  constructor(position: number) {
    this._position = position;
    this._player = null;
    this._snake = null;
    this._ladder = null;
  }

  public setPlayer(player: Player | null) {
    this._player = player;
  }

  public getPlayer(): Player {
    return this._player;
  }

  public setSnake(snake: Snake) {
    this._snake = snake;
  }

  public getSnake(): Snake {
    return this._snake;
  }

  public setLadder(ladder: Ladder) {
    this._ladder = ladder;
  }

  public getLadder(): Ladder {
    return this._ladder;
  }
}
