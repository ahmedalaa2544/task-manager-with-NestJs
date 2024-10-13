import { Module } from '@nestjs/common';
import { TaskDbService } from './task-db.service';

@Module({
  providers: [TaskDbService]
})
export class TaskDbModule {}
