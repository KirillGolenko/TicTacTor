import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGameDto } from 'src/dto/game.dto';
import { MoveDto } from 'src/dto/move.dto';
import { Game, GameDocument } from 'src/schema/game.schema';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  async createGame(data: CreateGameDto) {
    const createdGame = new this.gameModel(data);
    return createdGame.save();
  }

  async moveGame(data: MoveDto) {
    return this.isEnd(data.board, data.player);
  }

  async isEnd(data: any[], player: string) {
    return (
      (data[0][0] === player &&
        data[1][0] === player &&
        data[2][0] === player) ||
      (data[0][1] === player &&
        data[1][1] === player &&
        data[2][1] === player) ||
      (data[0][2] === player &&
        data[1][2] === player &&
        data[2][2] === player) ||
      (data[0][0] === player &&
        data[0][1] === player &&
        data[0][2] === player) ||
      (data[1][0] === player &&
        data[1][1] === player &&
        data[1][2] === player) ||
      (data[2][0] === player &&
        data[2][1] === player &&
        data[2][2] === player) ||
      (data[0][0] === player &&
        data[1][1] === player &&
        data[2][2] === player) ||
      (data[0][2] === player && data[1][1] === player && data[2][0] === player)
    );
  }
}
