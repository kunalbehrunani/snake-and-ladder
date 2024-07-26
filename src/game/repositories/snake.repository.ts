import { Injectable } from '@nestjs/common';
import { Snake } from '../schemas/snake.schema';

@Injectable()
export class SnakeRepository {
  createNewSnake(param: { head: number; tail: number; name: string }): Snake {
    return new Snake(param.head, param.tail, param.name);
  }
}
