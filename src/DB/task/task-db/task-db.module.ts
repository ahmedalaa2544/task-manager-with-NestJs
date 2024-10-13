import { Module } from '@nestjs/common';
import { TaskDbService } from './task-db.service';
import { Task, taskSchema } from './task.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: taskSchema }]),
  ],
  providers: [TaskDbService],
  exports: [TaskDbService],
})
export class TaskDbModule {}
