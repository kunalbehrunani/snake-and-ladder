import { Injectable } from '@nestjs/common';
import { Snake } from '../schemas/snake.schema';

@Injectable()
export class SnakeRepository {
  private _snakes: Snake[] = [];

  createNewSnake(param: { head: number; tail: number; name: string }): Snake {
    const snake = new Snake(param.head, param.tail, param.name);
    this._snakes.push(snake);
    return snake;
  }
}
