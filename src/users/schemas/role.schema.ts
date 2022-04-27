import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema({ toJSON: { virtuals: true } })
export class Role {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, default: [], index: true })
  permissions: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
