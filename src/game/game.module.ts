import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { BoardRepository } from './repositories/board.repository';
import { LadderRepository } from './repositories/ladder.repository';
import { PlayerRepository } from './repositories/player.repository';
import { SnakeRepository } from './repositories/snake.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    GameService,
    BoardRepository,
    SnakeRepository,
    LadderRepository,
    PlayerRepository,
  ],
})
export class GameModule {
  constructor(private readonly gameService: GameService) {
    this.gameService.startGame();
  }
}
