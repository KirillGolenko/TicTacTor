import { IsNotEmpty } from 'class-validator';

export class MoveDto {
  @IsNotEmpty()
  roomId: number;

  @IsNotEmpty()
  player: string;

  @IsNotEmpty()
  board: any[];
}
