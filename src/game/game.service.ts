import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const Room = await this.gameModel.findOne({ game_id: data.roomId });
    const board = Room.board;
    const { player } = data;
    board[data.board[0]] = data.player;

    const result = await this.gameModel.findOneAndUpdate(
      { game_id: data.roomId },
      { $set: { board: board } },
      { new: true },
      (err, data) => {
        if (err) {
          throw new HttpException('Error', HttpStatus.BAD_REQUEST);
        }
      },
    );
    return { win: this.isEnd(result.board, player), data: result };
  }

  isEnd(board, player) {
    return (board[0] === player &&
      board[1] === player &&
      board[2] === player) ||
      (board[3] === player && board[4] === player && board[5] === player) ||
      (board[6] === player && board[7] === player && board[8] === player) ||
      (board[0] === player && board[3] === player && board[6] === player) ||
      (board[1] === player && board[4] === player && board[7] === player) ||
      (board[2] === player && board[5] === player && board[8] === player) ||
      (board[0] === player && board[4] === player && board[8] === player) ||
      (board[2] === player && board[7] === player && board[6] === player)
      ? `win ${player}`
      : null;
  }
}
