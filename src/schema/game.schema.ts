import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GameDocument = Game & Document;

@Schema()
export class Game {
  @Prop()
  game_id: number;

  @Prop()
  status: string;

  @Prop()
  first_player: string;

  @Prop()
  board: Array<string>;
}

export const GameSchema = SchemaFactory.createForClass(Game);
