import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReplacementDocument = Replacement & Document;

@Schema({ toJSON: { virtuals: true } })
export class Replacement {
  @Prop({ required: true })
  replacedSchedule: Types.ObjectId;

  @Prop({ required: true })
  replacingSubject: Types.ObjectId;

  @Prop({ required: true, trim: true })
  date: string;

  @Prop({ required: true, trim: true })
  teacher: string;

  @Prop({ required: true, trim: true })
  location: number;
}

export const ReplacementSchema = SchemaFactory.createForClass(Replacement);
