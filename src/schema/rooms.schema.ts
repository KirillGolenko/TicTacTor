import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomsDocument = Game & Document;

@Schema()
export class Game {
  @Prop()
  name: number;

  @Prop()
  players: any[];
}

export const RoomsSchema = SchemaFactory.createForClass(Game);
