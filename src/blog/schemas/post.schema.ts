import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import pagination from 'mongoose-paginate-v2';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ required: true, trim: true })
  date: string;

  @Prop({ required: true, trim: true, lowercase: true, default: [] })
  categories: [string];

  @Prop({ trim: true, lowercase: true, default: [] })
  keywords: [string];

  @Prop({ required: true })
  preview: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  subtitle: string;

  @Prop({ required: true })
  text: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.plugin(pagination);
