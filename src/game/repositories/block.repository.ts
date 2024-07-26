import { Injectable } from '@nestjs/common';
import { Block } from '../schemas/block.schema';

@Injectable()
export class BlockRepository {
  createNewBlock(param: { position: number }): Block {
    return new Block(param.position);
  }
}
