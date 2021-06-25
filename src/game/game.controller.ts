import { Body, Controller, Post } from '@nestjs/common';
import { CreateGameDto } from 'src/dto/game.dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Post('create')
  async all(@Body() data: CreateGameDto) {
    return this.gameService.createGame(data);
  }

  @Post('move')
  async moveGame(@Body() data) {
    return this.gameService.moveGame(data);
  }
}
