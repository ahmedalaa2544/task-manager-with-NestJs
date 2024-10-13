import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, taskSchema } from './task.schema';
import { Model, FilterQuery } from 'mongoose';

@Injectable()
export class TaskDbService {
  constructor(
    @InjectModel(Task.name) private readonly _taskModel: Model<Task>,
  ) {}
}
