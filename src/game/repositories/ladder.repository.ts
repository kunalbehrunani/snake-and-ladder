import { Injectable } from '@nestjs/common';
import { Ladder } from '../schemas/ladder.schema';

@Injectable()
export class LadderRepository {
  private _ladders: Ladder[] = [];

  createNewLadder(param: {
    bottom: number;
    top: number;
    name: string;
  }): Ladder {
    const ladder = new Ladder(param.bottom, param.top, param.name);
    this._ladders.push(ladder);
    return ladder;
  }
}
