import { Injectable } from '@nestjs/common';
import { Player } from '../schemas/player.schema';

@Injectable()
export class PlayerRepository {
  private _players: Player[] = [];
  private _currentPlayerIndex: number = null;

  constructor() {}

  createNewPlayer(param: {
    firstName: string;
    lastName: string;
    userName: string;
  }): Player {
    const player = new Player(param.firstName, param.lastName, param.userName);
    this._players.push(player);
    return player;
  }

  getNextPlayer() {
    if (this._currentPlayerIndex === null) {
      this._currentPlayerIndex = 0;
    } else {
      this._currentPlayerIndex += 1;
      if (this._currentPlayerIndex >= this._players.length) {
        this._currentPlayerIndex = 0;
      }
    }
    return this._players[this._currentPlayerIndex];
  }
}
