import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema({ toJSON: { virtuals: true } })
export class Token {
  @Prop({ required: true })
  user: Types.ObjectId;

  @Prop({ required: true, trim: true })
  token: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
