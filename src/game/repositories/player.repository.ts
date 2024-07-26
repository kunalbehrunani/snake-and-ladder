import { Injectable } from '@nestjs/common';
import { Player } from '../schemas/player.schema';

@Injectable()
export class PlayerRepository {
  constructor() {}

  createNewPlayer(param: {
    firstName: string;
    lastName: string;
    userName: string;
  }): Player {
    return new Player(param.firstName, param.lastName, param.userName);
  }
}
