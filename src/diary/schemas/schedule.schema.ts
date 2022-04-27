import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ScheduleDocument = Schedule & Document;

@Schema({ toJSON: { virtuals: true } })
export class ReplacementSchedule {
  @Prop({ required: true, trim: true })
  subject: Types.ObjectId[];

  @Prop({ required: false, trim: true })
  teacher: string;

  @Prop({ required: false, trim: true })
  location: string;
}

@Schema({ toJSON: { virtuals: true } })
export class ScheduleSubject {
  @Prop({ required: true, trim: true })
  subject: Types.ObjectId[];

  @Prop({ required: true, trim: true })
  bell: Types.ObjectId[];

  @Prop({ required: false })
  replacement: ReplacementSchedule;
}

@Schema({ toJSON: { virtuals: true } })
export class ScheduleDay {
  @Prop()
  subjects: [ScheduleSubject];
}

@Schema({ toJSON: { virtuals: true } })
export class ScheduleDays {
  @Prop()
  1: ScheduleDay;
  @Prop()
  2: ScheduleDay;
  @Prop()
  3: ScheduleDay;
  @Prop()
  4: ScheduleDay;
  @Prop()
  5: ScheduleDay;
  @Prop()
  6: ScheduleDay;
  @Prop()
  7: ScheduleDay;
}

@Schema({ toJSON: { virtuals: true } })
export class Schedule {
  @Prop({ required: true })
  weekDate: string;

  @Prop({ required: true })
  days: ScheduleDays;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
