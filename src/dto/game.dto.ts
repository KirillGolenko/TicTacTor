import { IsNotEmpty } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  game_id: number;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  first_player: string;

  @IsNotEmpty()
  board: Array<string>;
}
