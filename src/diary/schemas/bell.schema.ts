import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PaginateModel, Document, model } from 'mongoose';
import pagination from 'mongoose-paginate-v2';

export type BellDocument = Bell & Document;

@Schema()
export class Bell {
  @Prop({ required: true, trim: true })
  starts: string;

  @Prop({ required: true, trim: true })
  ends: string;
}

export const BellSchema = SchemaFactory.createForClass(Bell);

BellSchema.plugin(pagination);
