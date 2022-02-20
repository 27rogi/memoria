import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ toJSON: { virtuals: true } })
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true, unique: true })
  email: string;

  @Prop({ required: true, trim: true, minlength: 8 })
  password: string;

  @Prop({ required: true, default: 1 })
  role: number;

  @Prop()
  isEnabled: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
