import { Injectable } from '@nestjs/common';
import { Ladder } from '../schemas/ladder.schema';

@Injectable()
export class LadderRepository {
  createNewLadder(param: { head: number; tail: number; name: string }): Ladder {
    return new Ladder(param.head, param.tail, param.name);
  }
}
