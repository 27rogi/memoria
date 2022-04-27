import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bell, BellSchema } from './schemas/bell.schema';
import { Replacement, ReplacementSchema } from './schemas/replacement.schema';
import { Schedule, ScheduleSchema } from './schemas/schedule.schema';
import { Subject, SubjectSchema } from './schemas/subject.schema';
import { BellService } from './services/bell.service';
import { BellController } from './controllers/bell.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bell.name, schema: BellSchema }]),
    MongooseModule.forFeature([{ name: Replacement.name, schema: ReplacementSchema }]),
    MongooseModule.forFeature([{ name: Schedule.name, schema: ScheduleSchema }]),
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }]),
  ],
  controllers: [BellController],
  providers: [BellService],
})
export class DiaryModule {}
