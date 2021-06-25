import { IsNotEmpty } from 'class-validator';

export class MoveDto {
  @IsNotEmpty()
  player: string;

  @IsNotEmpty()
  board: any[];
}
